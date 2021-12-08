import React from 'react';
import fs from 'fs';
import path from 'path';
import glob from 'glob';

import { bundleMDX } from 'mdx-bundler';
import { getMDXComponent } from 'mdx-bundler/client';

const DesignSystemPage = ({ code }) => {
  const MDX = React.useMemo(() => getMDXComponent(code), [code]);

  return <MDX />;
};

export async function getStaticProps({ params }) {
  const filename = path.join(params.slug, params.slug + '.docs.mdx');

  const pathToSource = path.join(process.cwd(), 'src', 'components', filename);

  const source = fs.readFileSync(pathToSource).toString();

  const { code, frontmatter } = await bundleMDX({
    source,
    cwd: path.dirname(pathToSource),
    esbuildOptions: (options) => {
      options.platform = 'node';
      return options;
    },
  });

  return {
    props: {
      code,
      title: frontmatter.title ?? 'Default title',
    },
  };
}

export async function getStaticPaths() {
  const docsFiles = glob.sync('src/components/**/*.docs.mdx');

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
