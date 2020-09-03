const http = require('http');
const path = require('path');
const qs = require('querystring');
const spawn = require('cross-spawn');
const getPort = require('get-port');
const treeKill = require('tree-kill');
const fetch = require('node-fetch');

function renderViaAPI(app, pathname, query) {
  const url = `${pathname}${query ? `?${qs.stringify(query)}` : ''}`;
  return app.renderToHTML({ url }, {}, pathname, query);
}

function renderViaHTTP(appPort, pathname, query) {
  return fetchViaHTTP(appPort, pathname, query).then((res) => res.text());
}

function fetchViaHTTP(appPort, pathname, query, opts) {
  const url = `http://localhost:${appPort}${pathname}${
    query ? `?${qs.stringify(query)}` : ''
  }`;
  return fetch(url, opts);
}

function findPort() {
  return getPort();
}

// Launch the app in dev mode.
function launchApp(dir, port, opts) {
  return runNextCommandDev([dir, '-p', port], undefined, opts);
}

function nextBuild(dir, args = [], opts = {}) {
  return runNextCommand(['build', dir, ...args], opts);
}

function nextExport(dir, { outdir }, opts = {}) {
  return runNextCommand(['export', dir, '--outdir', outdir], opts);
}

function nextExportDefault(dir, opts = {}) {
  return runNextCommand(['export', dir], opts);
}

function nextStart(dir, port, opts = {}) {
  return runNextCommandDev(['start', '-p', port, dir], undefined, {
    ...opts,
    nextStart: true,
  });
}

function runNextCommand(argv, options = {}) {
  const nextDir = path.dirname(__dirname, '../');
  const nextBin = path.join(nextDir, 'node_modules/next/dist/bin/next');
  const cwd = options.cwd || nextDir;
  // Let Next.js decide the environment
  const env = {
    ...process.env,
    ...options.env,
    NODE_ENV: '',
    __NEXT_TEST_MODE: 'true',
  };

  return new Promise((resolve, reject) => {
    const instance = spawn('node', ['--no-deprecation', nextBin, ...argv], {
      ...options.spawnOptions,
      cwd,
      env,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    if (typeof options.instance === 'function') {
      options.instance(instance);
    }

    let stderrOutput = '';
    if (options.stderr) {
      instance.stderr.on('data', function (chunk) {
        stderrOutput += chunk;
      });
    }

    let stdoutOutput = '';
    if (options.stdout) {
      instance.stdout.on('data', function (chunk) {
        stdoutOutput += chunk;
      });
    }

    instance.on('close', (code) => {
      if (
        !options.stderr &&
        !options.stdout &&
        !options.ignoreFail &&
        code !== 0
      ) {
        return reject(new Error(`command failed with code ${code}`));
      }

      resolve({
        code,
        stdout: stdoutOutput,
        stderr: stderrOutput,
      });
    });

    instance.on('error', (err) => {
      err.stdout = stdoutOutput;
      err.stderr = stderrOutput;
      reject(err);
    });
  });
}

function runNextCommandDev(argv, stdOut, opts = {}) {
  const cwd = path.dirname(__dirname, '../');

  const env = {
    ...process.env,
    NODE_ENV: undefined,
    __NEXT_TEST_MODE: 'true',
    ...opts.env,
  };

  return new Promise((resolve, reject) => {
    const instance = spawn(
      'node',
      ['--no-deprecation', 'node_modules/next/dist/bin/next', ...argv],
      { cwd, env }
    );
    let didResolve = false;

    function handleStdout(data) {
      const message = data.toString();
      const bootupMarkers = {
        dev: /compiled successfully/i,
        start: /started server/i,
      };
      if (
        bootupMarkers[opts.nextStart || stdOut ? 'start' : 'dev'].test(message)
      ) {
        if (!didResolve) {
          didResolve = true;
          resolve(stdOut ? message : instance);
        }
      }

      if (typeof opts.onStdout === 'function') {
        opts.onStdout(message);
      }

      if (opts.stdout !== false) {
        process.stdout.write(message);
      }
    }

    function handleStderr(data) {
      const message = data.toString();
      if (typeof opts.onStderr === 'function') {
        opts.onStderr(message);
      }

      if (opts.stderr !== false) {
        process.stderr.write(message);
      }
    }

    instance.stdout.on('data', handleStdout);
    instance.stderr.on('data', handleStderr);

    instance.on('close', () => {
      instance.stdout.removeListener('data', handleStdout);
      instance.stderr.removeListener('data', handleStderr);
      if (!didResolve) {
        didResolve = true;
        resolve();
      }
    });

    instance.on('error', (err) => {
      reject(err);
    });
  });
}

// Kill a launched app
async function killApp(instance) {
  await new Promise((resolve, reject) => {
    treeKill(instance.pid, (err) => {
      if (err) {
        if (
          process.platform === 'win32' &&
          typeof err.message === 'string' &&
          (err.message.includes(`no running instance of the task`) ||
            err.message.includes(`not found`))
        ) {
          // Windows throws an error if the process is already dead
          //
          // Command failed: taskkill /pid 6924 /T /F
          // ERROR: The process with PID 6924 (child process of PID 6736) could not be terminated.
          // Reason: There is no running instance of the task.
          return resolve();
        }
        return reject(err);
      }

      resolve();
    });
  });
}

async function startApp(app) {
  await app.prepare();
  const handler = app.getRequestHandler();
  const server = http.createServer(handler);
  server.__app = app;

  await promiseCall(server, 'listen');
  return server;
}

async function stopApp(server) {
  if (server.__app) {
    await server.__app.close();
  }
  await promiseCall(server, 'close');
}

function promiseCall(obj, method, ...args) {
  return new Promise((resolve, reject) => {
    const newArgs = [
      ...args,
      function (err, res) {
        if (err) return reject(err);
        resolve(res);
      },
    ];

    obj[method](...newArgs);
  });
}

module.exports = {
  renderViaAPI,
  renderViaHTTP,
  fetchViaHTTP,
  findPort,
  launchApp,
  nextBuild,
  nextStart,
  nextExport,
  nextExportDefault,
  startApp,
  stopApp,
  killApp,
};
