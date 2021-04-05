import Link from "next/link";
import Content from "../../components/Content";
import { getPostsSlug, getPost } from "../../queries";

export default function Post({
  post,
  author,
  featuredImage,
  preview,
  content,
}) {
  return (
    <article>
      {preview && <Link href="/api/exit-preview">Exit preview</Link>}
      <header>
        {featuredImage && (
          <img src={featuredImage.sourceUrl} alt={featuredImage.altText} />
        )}
        <h1>{post.title}</h1>
        Author: {author.name}
        <br />
        Published: <time dateTime={post.date}>{post.date}</time>
      </header>
      <Content items={content} />
      <Link href="/blog">Back to blog</Link>
    </article>
  );
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const { post, author, featuredImage, content } = await getPost(
    params.slug,
    preview,
    previewData
  );

  return { props: { post, author, featuredImage, preview, content } };
}

export async function getStaticPaths() {
  const { posts } = await getPostsSlug();

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    // Fallback true is not properly supported on netlify (no caching) so it's not recommended here.
    fallback: false,
  };
}
