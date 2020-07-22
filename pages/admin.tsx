import dynamic from 'next/dynamic';

const Admin = dynamic(
  // @ts-ignore
  () =>
    import('netlify-cms-app').then((CMS) => {
      // @ts-ignore
      CMS.init({
        config: {
          backend: {
            name: 'github',
            repo: 'adammockor/nextjs-mdx-netlify',
          },
          local_backend: true,
          media_folder: 'public/img',
          public_folder: 'img',
          collections: [
            {
              name: 'components',
              label: 'Components',
              label_singular: 'Component',
              folder: 'components',
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
                  widget: 'markdown',
                },
              ],
              extension: 'mdx',
              format: 'frontmatter',
            },
          ],
        },
      });
    }),
  { ssr: false }
);

export default Admin;
