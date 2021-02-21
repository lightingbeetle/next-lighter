import Document, { Html, Head, Main, NextScript } from "next/document";
import micromatch from "micromatch";
import { promises as fs } from "fs";
import path from "path";
import customPages from "../custom-pages";
import {
  getDocumentFiles,
  getStaticDocumentFiles,
} from "../utils/get-document-files";

// TODO:
// - this component is emitting "Warning: Each child in a list should have a unique "key" prop." error. Not sure why.
class StaticHead extends Head {
  render() {
    let { head } = this.context;
    let children = this.props.children;

    const files = getDocumentFiles(
      this.context.buildManifest,
      this.context.__NEXT_DATA__.page
    );

    return (
      <head {...this.props}>
        {head}
        {process.env.__NEXT_OPTIMIZE_FONTS
          ? this.makeStylesheetInert(this.getCssLinks(files))
          : this.getCssLinks(files)}
        {children}
      </head>
    );
  }
}

class CustomScripts extends NextScript {
  render() {
    // @ts-ignore
    const { scripts } = this.props;

    const files = getStaticDocumentFiles(
      this.context.buildManifest,
      this.context.__NEXT_DATA__.page,
      scripts
    );

    return (
      <>
        {this.getPolyfillScripts()}
        {this.getScripts(files)}
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
        path.resolve(".next", "custom-entries-build-manifest.json"),
        "utf8"
      );

      if (manifestFile) {
        const { customEntries } = JSON.parse(manifestFile);

        scripts = customEntries;
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
