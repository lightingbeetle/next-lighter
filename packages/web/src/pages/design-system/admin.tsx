import dynamic from "next/dynamic";
import * as Components from "components";
import * as Styleguide from "@lighting-beetle/lighter-styleguide";

const componentImports = Object.keys(Components).reduce((acc, key) => {
  acc[`./${key}`] = { ImportDefault: Components[key] };
  return acc;
}, {});

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
            repo: "adammockor/nextjs-mdx-netlify"
          },
          // @ts-ignore
          local_backend: true,
          media_folder: "packages/web/public/img",
          public_folder: "packages/web/public",
          load_config_file: false,
          collections: [
            {
              name: "components",
              label: "Components docs",
              label_singular: "Component docs",
              folder: "packages/components/components/src",
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

      CMS.registerWidget(
        "mdx",
        WidgetMdx.MdxControl,
        WidgetMdx.setupPreview({
          components: {
            h1: ({ children, ...props }) => (
              <h1 style={{ color: "tomato" }} {...props}>
                {children}
              </h1>
            ),
            h2: ({ children, ...props }) => (
              <h2 style={{ color: "blue" }} {...props}>
                {children}
              </h2>
            ),
            inlineCode: props => <Styleguide.Code {...props} />,
            code: props => (
              <Styleguide.Code
                inline={false}
                language={props.className?.replace(/language-/, "")}
                {...props}
              />
            )
          },
          allowedImports: {
            "..": {
              Import: Components
            },
            ...componentImports,
            "@lighting-beetle/lighter-styleguide": {
              Import: Styleguide
            }
          }
        })
      );
    }),
  { ssr: false }
);

export default Admin;
