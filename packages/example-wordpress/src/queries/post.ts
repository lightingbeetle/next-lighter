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

export async function getPost(
  slug: string,
  preview: boolean,
  previewData: any
) {
  const postPreview = preview && previewData?.post;
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug));
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug;
  const isDraft = isSamePost && postPreview?.status === "draft";
  const isRevision = isSamePost && postPreview?.status === "publish";

  const data = await fetcher(
    gql`
      query getPost($id: ID!, $idType: PostIdType!) {
        post(id: $id, idType: $idType) {
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
    {
      id: isDraft ? postPreview.id : slug,
      idType: isDraft ? "DATABASE_ID" : "SLUG",
    }
  );

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id;
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node;

    if (revision) Object.assign(data.post, revision);
    delete data.post.revisions;
  }

  return {
    post: data.post,
    author: data.post.author?.node ?? null,
    featuredImage: data.post.featuredImage?.node ?? null,
  };
}

export async function getPostPreview({ id: postId, slug: postSlug }) {
  const id = postId || postSlug;
  const idType = postId ? "DATABASE_ID" : "SLUG";

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
      id,
      idType,
    }
  );

  return data.post;
}
