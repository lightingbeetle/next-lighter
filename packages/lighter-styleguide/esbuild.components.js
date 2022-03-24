const esbuild = require("esbuild");
const esmExternals = require("@esbuild-plugins/esm-externals").default;
const svgPlugin = require("esbuild-plugin-svg");

async function bundle() {
  const config = {
    entryPoints: ["./src/index.tsx"],
    bundle: true,
    target: "es2018",
    format: "cjs",
    minify: true,
    sourcemap: true,
    outfile: "dist/index.js",
    loader: {
      ".js": "jsx",
      ".woff": "file",
      ".woff2": "file",
      ".ttf": "file",
    },
    plugins: [esmExternals({ externals: ["react", "react-dom"] }), svgPlugin()],
  };

  try {
    await esbuild.build(config);
    await esbuild.build({
      ...config,
      format: "esm",
      outfile: "dist/index.module.js",
    });
  } catch {
    process.exit(1);
  }
}

bundle();
