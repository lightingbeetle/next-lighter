import fs from "fs";
import glob from "glob";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { Styleguide } from "@lighting-beetle/lighter-styleguide";

function Blog({ routes }) {
  return (
    <Styleguide
      routes={routes}
      currentPage="Design system"
      adminHref="/design-system/admin"
    >
      <h1>Design system</h1>
      <Link href="/design-system/admin">
        <a>Admin</a>
      </Link>
    </Styleguide>
  );
}

export async function getStaticProps() {
  const docsFiles = glob.sync("../components/src/**/*.docs.mdx");

  const posts = docsFiles.map(filename => {
    const markdownWithMetadata = fs
      .readFileSync(path.join(process.cwd(), filename))
      .toString();

    const { data } = matter(markdownWithMetadata);

    return {
      slug: "/design-system/" + path.basename(filename, ".docs.mdx"),
      title: data.title
    };
  });

  return {
    props: {
      routes: [
        {
          title: "Design system",
          href: "/design-system"
        },
        {
          title: "Components",
          routes: posts.map(post => ({
            title: post.title,
            href: post.slug
          }))
        }
      ]
    }
  };
}

export default Blog;
