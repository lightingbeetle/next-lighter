import { getPosts } from "../../queries";

export default function Index({ posts }) {
  return (
    <>
      <h1>Blog</h1>
      {posts.map((post) => (
        <article key={post.slug}>
          <h2>{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post?.excerpt ?? "" }} />
          <a href={`/blog/${post.slug}`}>Read more</a>
        </article>
      ))}
    </>
  );
}

export async function getStaticProps() {
  const { posts } = await getPosts();

  return { props: { posts } };
}
