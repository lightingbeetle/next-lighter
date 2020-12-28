import fs from 'fs';
import path from 'path';
import glob from 'glob';
import dynamic from 'next/dynamic';
import matter from 'gray-matter';
import { Styleguide } from '@lighting-beetle/lighter-styleguide';

const DesignSystemPage = ({ filename, routes ,title}) => {
  const MDXContent = dynamic(
    () => import(`../../../../components/src/${filename}`)
  );

  return (
    <Styleguide routes={routes} currentPage={title} logoSrc="/logo.svg" adminHref="/design-system/admin">
      <MDXContent />
    </Styleguide>
  );
};

export async function getStaticProps({ params }) {
  const docsFiles = glob.sync('../components/src/**/*.docs.mdx');
  const filename = path.join('components', params.slug, params.slug + '.docs.mdx');

  const mdxPost = fs
    .readFileSync(path.join(process.cwd(), '..', 'components', 'src', filename))
    .toString();

  // @ts-ignore
  const { data } = matter(mdxPost);

  const posts = docsFiles.map((filename) => {
    const markdownWithMetadata = fs
      .readFileSync(path.join(process.cwd(), filename))
      .toString();

    const { data } = matter(markdownWithMetadata);

    return {
      slug: '/design-system/' + path.basename(filename, '.docs.mdx'),
      title: data.title ?? 'Default title',
    };
  });

  return {
    props: {
      filename,
      title: data.title ?? 'Default title',
      routes: [
        {
          title: 'Design system',
          href: '/design-system',
        },
        {
          title: 'Components',
          routes: posts.map((post) => ({
            title: post.title,
            href: post.slug,
          })),
        },
      ],
    },
  };
}

export async function getStaticPaths() {
  const docsFiles = glob.sync('../components/src/**/*.docs.mdx');

  // Loop through all post files and create array of slugs (to create links)
  const paths = docsFiles.map((filename) => ({
    params: {
      slug: path.basename(filename, '.docs.mdx'),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default DesignSystemPage;
