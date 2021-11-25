const esbuild = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");
const alias = require("esbuild-plugin-alias");
const EsmExternals = require("@esbuild-plugins/esm-externals").default;

async function bundleIndex() {
  const config = {
    entryPoints: ["./src/index.ts"],
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: "dist/index.js",
    plugins: [
      sassPlugin(),
      EsmExternals({ externals: ["react", "react-dom"] }),
    ],
    external: ["@lighting-beetle/lighter-styleguide"],
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

async function bundleStatic() {
  const config = {
    entryPoints: ["./src/static.ts"],
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: "dist/static.js",
    plugins: [
      alias({
        react: require.resolve("preact/compat"),
        "react-dom": require.resolve("preact/compat"),
      }),
    ],
  };

  try {
    await esbuild.build(config);
    await esbuild.build({
      ...config,
      format: "esm",
      outfile: "dist/static.module.js",
    });
  } catch {
    process.exit(1);
  }
}

bundleIndex();
bundleStatic();
