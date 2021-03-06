import dynamic from "next/dynamic";
import * as Components from "components";
import * as Styleguide from "@lighting-beetle/lighter-styleguide";
import { useEffect, useState } from "react";

const componentImports = Object.keys(Components).reduce((acc, key) => {
  acc[`./${key}`] = { ImportDefault: Components[key] };
  return acc;
}, {});

function StyleComponentsInjector({ children }) {
  const [iframeRef, setIframeRef] = useState(null);

  useEffect(() => {
    const iframe = document.getElementsByTagName("iframe")[0];
    const iframeHeadElem = iframe.contentDocument.head;
    setIframeRef(iframeHeadElem);
  }, []);

  return (
    iframeRef && (
      <Styleguide.StyleSheetManager target={iframeRef}>
        {children}
      </Styleguide.StyleSheetManager>
    )
  );
}

// Netify stuff has to be imported dynamically because their are dependend on window and document so we can't ssr them
const Admin = dynamic(
  // @ts-ignore
  () =>
    Promise.all([
      import("netlify-cms-app"),
      import("netlify-cms-widget-mdx"),
    ]).then(([{ default: CMS }, WidgetMdx]) => {
      // @ts-ignore
      window.CMS_MANUAL_INIT = true;

      CMS.init({
        config: {
          backend: {
            name: "github",
            repo: "lightingbeetle/next-lighter",
            branch: "main",
          },
          local_backend: true,
          publish_mode: "editorial_workflow",
          media_folder: "packages/example/public/img",
          public_folder: "packages/example/public",
          load_config_file: false,
          collections: [
            {
              name: "components",
              label: "Components docs",
              label_singular: "Component docs",
              folder: "packages/components/src/components",
              path: "{{title}}/{{slug}}",
              create: true,
              slug: "{{title}}.docs",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "string",
                },
                {
                  label: "Docs",
                  name: "body",
                  // @ts-ignore
                  widget: "mdx",
                  // @ts-ignore
                  mode: "raw",
                },
              ],
              extension: "mdx",
              format: "frontmatter",
            },
          ],
        },
      });

      CMS.registerPreviewStyle("/_next/static/css/styles.chunk.css");

      CMS.registerPreviewTemplate("components", ({ widgetFor }) =>
        widgetFor("body")
      );

      CMS.registerWidget("mdx", WidgetMdx.MdxControl, (args) => (
        <StyleComponentsInjector>
          {WidgetMdx.setupPreview({
            components: Styleguide.mdxComponents,
            allowedImports: {
              "../../": {
                Import: Components,
              },
              ...componentImports,
              "@lighting-beetle/lighter-styleguide": {
                Import: Styleguide,
              },
            },
          })(args)}
        </StyleComponentsInjector>
      ));
    }),
  { ssr: false }
);

export default Admin;
