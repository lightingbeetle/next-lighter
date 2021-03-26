import fetcher from '../../fetcher';
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
  const { postBy: post } = await fetcher(getPost, { slug: params.slug });

  return { props: { post } };
}

export async function getStaticPaths() {
  const { posts } = await fetcher(getPostsSlug, {});

  const paths = posts.nodes.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    // Fallback true is not properly supported on netlify (no caching) so it's not recommended here.
    fallback: false,
  };
}
