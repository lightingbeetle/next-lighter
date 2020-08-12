import Document, { Html, Head, Main, NextScript } from 'next/document';
import micromatch from 'micromatch';
import staticPages from '../static-pages';
import staticBuildManifest from '../.next/static-build-manifest.json';

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

class StaticScripts extends NextScript {
  render() {
    const {
      _devOnlyInvalidateCacheQueryString,
      _documentProps: { files, assetPrefix, isDevelopment },
    } = this.context;
    const nextJsFiles = micromatch(files, ['static/chunks/webpack*.js']);
    const staticFiles = isDevelopment
      ? ['static/chunks/static.js']
      : staticBuildManifest.staticFiles;
    console.log(staticFiles, isDevelopment);

    return (
      <>
        {this.getPolyfillScripts()}
        {[...nextJsFiles, ...staticFiles].map((file) => {
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
  isPageStatic: boolean;
}

class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    const isPageStatic = micromatch.isMatch(ctx.pathname, staticPages);

    return { ...initialProps, isPageStatic };
  }

  render() {
    return (
      <Html>
        {this.props.isPageStatic ? <StaticHead /> : <Head />}
        <body>
          <Main />
          {this.props.isPageStatic ? <StaticScripts /> : <NextScript />}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
