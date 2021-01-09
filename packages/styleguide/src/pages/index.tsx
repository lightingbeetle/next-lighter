import fs from "fs";
import glob from "glob";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

const Index = ({ posts }) => {
  return (
    <>
      <h1>Component docs</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={post.slug}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export async function getStaticProps() {
  const docsFiles = glob.sync("**/*.docs.mdx");
  console.log(docsFiles);

  const posts = docsFiles.map((filename) => {
    const markdownWithMetadata = fs
      .readFileSync(path.join(process.cwd(), filename))
      .toString();

    const { data } = matter(markdownWithMetadata);

    return {
      slug: path.basename(filename, ".docs.mdx"),
      title: data.title,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

export default Index;
