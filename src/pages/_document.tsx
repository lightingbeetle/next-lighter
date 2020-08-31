import Document, { Html, Head, Main, NextScript } from 'next/document';
import micromatch from 'micromatch';
import { promises as fs } from 'fs';
import path from 'path';
import customPages from '../custom-pages';

// TODO:
// - this component is emitting "Warning: Each child in a list should have a unique "key" prop." error. Not sure why.
class StaticHead extends Head {
  render() {
    let { head } = this.context._documentProps;
    let children = this.props.children;

    return (
      <head {...this.props}>
        {head}
        {this.getCssLinks()}
        {children}
      </head>
    );
  }
}

class CustomScripts extends NextScript {
  render() {
    // @ts-ignore
    const { scripts } = this.props;
    const {
      _devOnlyInvalidateCacheQueryString,
      _documentProps: { files, assetPrefix, isDevelopment },
    } = this.context;

    const nextJsFiles = micromatch(files, ['static/chunks/webpack*.js']);

    return (
      <>
        {this.getPolyfillScripts()}
        {[...nextJsFiles, ...scripts].map((file) => {
          let modernProps = {};
          if (process.env.__NEXT_MODERN_BUILD) {
            modernProps = file.endsWith('.module.js')
              ? { type: 'module' }
              : { noModule: true };
          }
          return (
            <script
              key={file}
              src={`${assetPrefix}/_next/${encodeURI(
                file
              )}${_devOnlyInvalidateCacheQueryString}`}
              nonce={this.props.nonce}
              async={!isDevelopment}
              crossOrigin={
                this.props.crossOrigin || process.env.__NEXT_CROSS_ORIGIN
              }
              {...modernProps}
            />
          );
        })}
      </>
    );
  }
}

interface MyDocumentProps {
  nextRuntime: boolean;
  scripts: string[];
}

class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    let nextRuntime = true;
    let scripts = [];

    // check if current page is custom page
    const customPage =
      customPages[micromatch.match(ctx.pathname, Object.keys(customPages))];

    if (customPage) {
      nextRuntime = customPage.nextRuntime;

      const manifestFile = await fs.readFile(
        path.resolve('.next', 'custom-entries-build-manifest.json'),
        'utf8'
      );

      if (manifestFile) {
        const { customEntries: customScripts } = JSON.parse(manifestFile);

        const scriptsPattern = [
          ...customPage.scripts,
          // match [scriptName]-[hash].[extension] filenames too
          ...customPage.scripts.map((entry) => {
            // split by last dot
            const [base, extension] = entry.split(/\.(?=[^\.]+$)/);
            // pattern to match with hash
            return `${base}-*.${extension}`;
          }),
        ];

        // get additional scripts which should be on the page
        scripts = micromatch.match(customScripts, scriptsPattern, {
          basename: true,
        });
      }
    }

    return { ...initialProps, scripts, nextRuntime };
  }

  render() {
    const { nextRuntime, scripts } = this.props;
    return (
      <Html>
        {nextRuntime ? <Head /> : <StaticHead />}
        <body>
          <Main />
          {nextRuntime && <NextScript />}
          {scripts.length !== 0 && (
            /* @ts-ignore */
            <CustomScripts scripts={scripts} />
          )}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
