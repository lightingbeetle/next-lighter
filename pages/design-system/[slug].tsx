import fs from 'fs';
import path from 'path';
import glob from 'glob';
import dynamic from 'next/dynamic';
import matter from 'gray-matter';

const Example = (props) => <div className="example" {...props} />;

const DesignSystemPage = ({ filename, title }) => {
  const MDXContent = dynamic(() => import(`../../${filename}`));

  return (
    <div>
      <h1>{title}</h1>
      <MDXContent />
    </div>
  );
};

export async function getStaticProps({ params }) {
  console.log(params);

  const filename = path.join(
    'components/',
    params.slug,
    params.slug + '.docs.mdx'
  );

  const mdxPost = fs
    .readFileSync(path.join(process.cwd(), filename))
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

  console.log(paths);

  return {
    paths,
    fallback: false,
  };
}

export default DesignSystemPage;
