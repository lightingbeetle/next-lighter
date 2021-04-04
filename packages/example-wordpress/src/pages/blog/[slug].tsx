import Link from "next/link";
import { getPostsSlug, getPost } from "../../queries";

export default function Post({ post, author, featuredImage }) {
  return (
    <article>
      <header>
        {featuredImage && (
          <img src={featuredImage.sourceUrl} alt={featuredImage.altText} />
        )}
        <h1>{post.title}</h1>
        Author: {author.name}
        <br />
        Published: <time dateTime={post.date}>{post.date}</time>
      </header>
      <div dangerouslySetInnerHTML={{ __html: post?.content ?? "" }} />
      <Link href="/blog">Back to blog</Link>
    </article>
  );
}

export async function getStaticProps({ params }) {
  const { post, author, featuredImage } = await getPost(params.slug);

  return { props: { post, author, featuredImage } };
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
