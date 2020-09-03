const NodeEnvironment = require('jest-environment-node');
const {
  findPort,
  launchApp,
  nextBuild,
  nextStart,
  killApp,
  nextExportDefault,
} = require('../utils');
const { join } = require('path');

const appDir = join(__dirname, '../../');
const outDir = join(appDir, 'out');

class IntegrationEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();

    this.global.devAppPort = await findPort();
    this.global.devApp = await launchApp(appDir, this.global.devAppPort);

    await nextBuild(appDir);

    this.global.appPort = await findPort();
    this.global.app = await nextStart(appDir, this.global.appPort);

    await nextExportDefault(appDir);
    this.global.outDir = outDir;
  }

  async teardown() {
    await super.teardown();
    killApp(this.global.devApp);
    killApp(this.global.app);
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = IntegrationEnvironment;
