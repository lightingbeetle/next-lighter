import dynamic from 'next/dynamic';
import { Example } from '../../components';

// Netify stuff has to be imported dynamically because their are dependend on window and document so we can't ssr them
const Admin = dynamic(
  // @ts-ignore
  () =>
    Promise.all([
      import('netlify-cms-app'),
      import('netlify-cms-widget-mdx'),
    ]).then(([{ default: CMS }, WidgetMdx]) => {
      // @ts-ignore
      window.CMS_MANUAL_INIT = true;

      CMS.init({
        config: {
          backend: {
            name: 'github',
            repo: 'adammockor/nextjs-mdx-netlify',
          },
          // @ts-ignore
          local_backend: true,
          media_folder: 'public/img',
          public_folder: 'img',
          collections: [
            {
              name: 'components',
              label: 'Components docs',
              label_singular: 'Component docs',
              folder: 'src/components',
              path: '{{title}}/{{slug}}',
              create: true,
              slug: '{{title}}.docs',
              fields: [
                {
                  label: 'Title',
                  name: 'title',
                  widget: 'string',
                },
                {
                  label: 'Docs',
                  name: 'body',
                  widget: 'mdx',
                },
              ],
              extension: 'mdx',
              format: 'frontmatter',
            },
          ],
        },
      });

      CMS.registerPreviewStyle('/_next/static/css/styles.chunk.css');

      CMS.registerPreviewTemplate('components', ({ widgetFor }) =>
        widgetFor('body')
      );

      CMS.registerWidget(
        'mdx',
        WidgetMdx.MdxControl,
        WidgetMdx.setupPreview({
          components: {
            h1: ({ children, ...props }) => (
              <h1 style={{ color: 'tomato' }} {...props}>
                {children}
              </h1>
            ),
            h2: ({ children, ...props }) => (
              <h2 style={{ color: 'blue' }} {...props}>
                {children}
              </h2>
            ),
          },
          allowedImports: {
            './Example': {
              ImportDefault: Example,
            },
          },
        })
      );
    }),
  { ssr: false }
);

export default Admin;
