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
    featuredImage: data.postBy.featuredImage?.node ?? null,
  };
}

export async function getPostPreview({ id: postId, slug: postSlug }) {
  const id = postId || postSlug;
  const idType = postId ? "DATABASE_ID" : "SLUG";

  console.log(id, idType);

  const data = await fetcher(
    gql`
      query PreviewPost($id: ID!, $idType: PostIdType!) {
        post(id: $id, idType: $idType) {
          databaseId
          slug
          status
        }
      }
    `,
    {
      id: "22",
      idType: "DATABASE_ID",
    }
  );

  console.log(data);

  return data.post;
}
