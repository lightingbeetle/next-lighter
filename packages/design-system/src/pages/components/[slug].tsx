import React from 'react';
import fs from 'fs';
import path from 'path';
import glob from 'glob';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';

import DesignSystemPage from '../../components/DesignSystemPage';
import {
  getDesignSystemRoutes,
  getMDXComponents,
  getMDXScope,
} from '../../utils';

const ComponentPage = ({ routes, title, mdxSource }) => {
  return (
    <DesignSystemPage routes={routes} title={title}>
      <MDXRemote {...mdxSource} components={getMDXComponents()} />
    </DesignSystemPage>
  );
};

export async function getStaticProps({ params }) {
  const routes = getDesignSystemRoutes();

  const filename = path.join(
    'components',
    params.slug,
    params.slug + '.docs.mdx'
  );

  const mdxPost = fs
    .readFileSync(path.join(process.cwd(), '..', 'components', 'src', filename))
    .toString();

  const { content, data } = matter(mdxPost);

  const mdxSource = await serialize(content, {
    scope: getMDXScope(),
  });

  return {
    props: {
      mdxSource,
      title: data.title ?? 'Default title',
      routes,
    },
  };
}

export async function getStaticPaths() {
  const docsFiles = glob.sync('../components/src/components/**/*.docs.mdx');

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

export default ComponentPage;
