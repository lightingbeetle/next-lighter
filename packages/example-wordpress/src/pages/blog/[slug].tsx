import { getPostsSlug, getPost } from '../../queries';

export default function Post({ post }) {
  return (
    <>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post?.content ?? '' }} />
    </>
  );
}

export async function getStaticProps({ params }) {
  const { post } = await getPost(params.slug);

  return { props: { post } };
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
