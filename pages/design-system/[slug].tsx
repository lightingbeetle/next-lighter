import fs from 'fs';
import path from 'path';
import glob from 'glob';
import dynamic from 'next/dynamic';
import matter from 'gray-matter';

const DesignSystemPage = ({ filename, title }) => {
  const MDXContent = dynamic(() => import(`../../components/${filename}`));

  return (
    <div>
      <h1>{title}</h1>
      <MDXContent />
    </div>
  );
};

export async function getStaticProps({ params }) {
  const filename = path.join(params.slug, params.slug + '.docs.mdx');

  const mdxPost = fs
    .readFileSync(path.join(process.cwd(), 'components', filename))
    .toString();

  // @ts-ignore
  const { data } = matter(mdxPost);

  return {
    props: {
      filename,
      title: data.title,
    },
  };
}

export async function getStaticPaths() {
  const docsFiles = glob.sync('components/**/*.docs.mdx');

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
