import { gql } from "graphql-request";

export const getPosts = gql`
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
`;

export const getPostsSlug = gql`
  {
    posts {
      nodes {
        id
        slug
      }
    }
  }
`;

export const getPost = gql`
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
    }
  }
`;
