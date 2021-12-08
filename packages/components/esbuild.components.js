const esbuild = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");
const alias = require("esbuild-plugin-alias");
const esmExternals = require("@esbuild-plugins/esm-externals").default;

async function bundleIndex() {
  const config = {
    entryPoints: ["./src/index.ts"],
    bundle: true,
    format: "cjs",
    minify: true,
    sourcemap: true,
    outfile: "dist/index.js",
    plugins: [
      sassPlugin({
        type: "css",
        async transform(css, resolveDir) {
          const {
            outputFiles: [out]
          } = await esbuild.build({
            stdin: {
              contents: css,
              resolveDir,
              loader: "css"
            },
            bundle: true,
            write: false,
            format: "esm",
            loader: {
              ".eot": "dataurl",
              ".woff": "dataurl",
              ".ttf": "dataurl",
              ".svg": "dataurl",
              ".otf": "dataurl"
            }
          });
          return out.text;
        }
      }),
      esmExternals({ externals: ["react", "react-dom"] })
    ],
    external: ["@lighting-beetle/lighter-styleguide"]
  };

  try {
    await esbuild.build(config);
    await esbuild.build({
      ...config,
      format: "esm",
      outfile: "dist/index.module.js"
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
        "react-dom": require.resolve("preact/compat")
      })
    ]
  };

  try {
    await esbuild.build(config);
    await esbuild.build({
      ...config,
      format: "esm",
      outfile: "dist/static.module.js"
    });
  } catch {
    process.exit(1);
  }
}

bundleIndex();
bundleStatic();
