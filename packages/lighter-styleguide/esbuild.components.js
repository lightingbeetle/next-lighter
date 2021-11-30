const esbuild = require("esbuild");
const esmExternals = require("@esbuild-plugins/esm-externals").default;

async function bundle() {
  const config = {
    entryPoints: ["./src/index.tsx"],
    bundle: true,
    format: "cjs",
    minify: true,
    sourcemap: true,
    outfile: "dist/index.js",
    plugins: [esmExternals({ externals: ["react", "react-dom"] })],
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
