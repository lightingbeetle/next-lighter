import fs from 'fs';
import glob from 'glob';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={post.slug}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const docsFiles = glob.sync('components/**/*.docs.mdx');

  const posts = docsFiles.map((filename) => {
    const markdownWithMetadata = fs
      .readFileSync(path.join(process.cwd(), filename))
      .toString();

    const { data } = matter(markdownWithMetadata);

    return {
      slug: '/design-system/' + path.basename(filename, '.docs.mdx'),
      title: data.title,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

export default Blog;
