import { dirname, resolve } from "path";

function tryToResolve(path) {
  try {
    const file = require.resolve(`${path}/index.scss`);
    return file;
  } catch {}

  try {
    const file = require.resolve(`${path}.scss`);
    return file;
  } catch {}

  try {
    const file = require.resolve(path);
    return file;
  } catch {}

  return null;
}

export default function scssTestImporter(baseDir) {
  return (originalPath, prev) => {
    let path;

    if (prev !== "stdin") {
      path = resolve(dirname(prev.substring(16)), `./${originalPath}`);
    } else {
      path = resolve(baseDir, `./${originalPath}`);
    }

    const file = tryToResolve(path);

    return { file };
  };
}
