import { gql } from "graphql-request";

import fetcher from "../fetcher";

export async function getPosts() {
  const data = await fetcher(gql`
    {
      posts {
        nodes {
          id
          author {
            node {
              name
            }
          }
          slug
          title
          excerpt
        }
      }
    }
  `);

  return { posts: data.posts.nodes };
}

export async function getPostsSlug() {
  const data = await fetcher(gql`
    {
      posts {
        nodes {
          id
          slug
        }
      }
    }
  `);

  return { posts: data.posts.nodes };
}

export async function getPost(slug: string) {
  const data = await fetcher(
    gql`
      query getPost($slug: String!) {
        postBy(slug: $slug) {
          content
          title
          date
          author {
            node {
              name
            }
          }
          featuredImage {
            node {
              srcSet
              altText
              sourceUrl
            }
          }
        }
      }
    `,
    { slug }
  );

  return {
    post: data.postBy,
    author: data.postBy.author.node,
    featuredImage: data.postBy.featuredImage.node,
  };
}
