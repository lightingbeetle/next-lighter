import dynamic from "next/dynamic";
import { StyleSheetManager } from "@lighting-beetle/lighter-styleguide";
import { useEffect, useState } from "react";
import getMDXComponents from "../utils/getMDXComponents";
import getMDXScope from "../utils/getMDXScope";

function StyleComponentsInjector({ children }) {
  const [iframeRef, setIframeRef] = useState(null);

  useEffect(() => {
    const iframe = document.getElementsByTagName("iframe")[0];
    const iframeHeadElem = iframe.contentDocument.head;
    setIframeRef(iframeHeadElem);
  }, []);

  return (
    iframeRef && (
      <StyleSheetManager target={iframeRef}>{children}</StyleSheetManager>
    )
  );
}

// Netify stuff has to be imported dynamically because their are dependend on window and document so we can't ssr them
const Admin = dynamic(
  // @ts-ignore
  () =>
    Promise.all([
      import("netlify-cms-app"),
      import("netlify-cms-widget-mdx")
    ]).then(([{ default: CMS }, WidgetMdx]) => {
      // @ts-ignore
      window.CMS_MANUAL_INIT = true;

      CMS.init({
        config: {
          backend: {
            name: "github",
            repo: "lightingbeetle/next-lighter",
            branch: "main"
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
                  widget: "string"
                },
                {
                  label: "Docs",
                  name: "body",
                  // @ts-ignore
                  widget: "mdx",
                  // @ts-ignore
                  mode: "raw"
                }
              ],
              extension: "mdx",
              format: "frontmatter"
            }
          ]
        }
      });

      CMS.registerPreviewStyle("/_next/static/css/styles.chunk.css");

      CMS.registerPreviewTemplate("components", ({ widgetFor }) =>
        widgetFor("body")
      );

      CMS.registerWidget("mdx", WidgetMdx.MdxControl, args => (
        <StyleComponentsInjector>
          {WidgetMdx.setupPreview({
            components: getMDXComponents().mdxComponents,
            scope: { ...getMDXScope(), ...getMDXComponents() }
          })(args)}
        </StyleComponentsInjector>
      ));
    }),
  { ssr: false }
);

export default Admin;
