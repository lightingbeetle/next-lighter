const { RawSource } = require('webpack-sources');

function isJsFile(file) {
  // We don't want to include `.hot-update.js` files into the initial page
  return !file.endsWith('.hot-update.js') && file.endsWith('.js');
}

function getFilesArray(files) {
  if (!files) {
    return [];
  }

  return files;
}

// This plugin creates a static-build-manifest.json for 'static' entry that are being output
// It has a mapping of "static" entry filename to real filename. Because the real filename can be hashed in production
class BuildManifestPlugin {
  constructor() {}

  createAssets(compilation, assets) {
    const namedChunks = compilation.namedChunks;
    const assetMap = {
      staticFiles: [],
    };

    const staticJsFile = namedChunks.get('static');

    const staticJsFiles = getFilesArray(
      staticJsFile && staticJsFile.files
    ).filter(isJsFile);

    assetMap.staticFiles = staticJsFiles;

    assets['static-build-manifest.json'] = new RawSource(
      JSON.stringify(assetMap, null, 2)
    );

    return assets;
  }

  apply(compiler) {
    compiler.hooks.emit.tap('NextJsBuildManifest', (compilation) => {
      this.createAssets(compilation, compilation.assets);
    });
  }
}

module.exports = BuildManifestPlugin;
