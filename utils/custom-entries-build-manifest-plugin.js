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
class CustomEntriesBuildManifestPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  createAssets(compilation, assets) {
    const namedChunks = compilation.namedChunks;
    const assetMap = {
      customEntries: [],
    };

    for (const entry of this.options.entries) {
      const entryChunk = namedChunks.get(entry);
      const entryJsFiles = getFilesArray(entryChunk && entryChunk.files).filter(
        isJsFile
      );

      assetMap.customEntries.push(...entryJsFiles);
    }

    assets['custom-entries-build-manifest.json'] = new RawSource(
      JSON.stringify(assetMap, null, 2)
    );

    return assets;
  }

  apply(compiler) {
    compiler.hooks.emit.tap(
      'CustomEntriesBuildManifestPlugin',
      (compilation) => {
        this.createAssets(compilation, compilation.assets);
      }
    );
  }
}

module.exports = CustomEntriesBuildManifestPlugin;
