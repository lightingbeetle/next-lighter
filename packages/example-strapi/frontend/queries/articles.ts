import { fetchAPI } from "../lib/api";

type Article = {
  id: string;
  attributes: {
    title: string;
    excerpt: string;
    slug: string;
    content: string;
    image: {
      data: {
        attributes: {
          alternativeText: string;
          url: string;
          width: string;
          height: string;
        };
      };
    };
  };
};

export async function getArticles({
  start = 0,
  limit = 10,
}: {
  start?: number;
  limit?: number;
} = {}) {
  const articlesData = await fetchAPI<{ articles: { data: Article[] } }>(
    `
      query getArticles($limit: Int, $start: Int) {
        articles(pagination: { limit: $limit, start: $start }) {
          data {
            id
            attributes {
              title
              excerpt
              slug
              image {
                data {
                  attributes {
                    alternativeText
                    url
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
      `,
    {
      variables: {
        start,
        limit,
      },
    }
  );

  return articlesData.articles.data;
}

export async function getArticleBySlug({ slug }: { slug: string }) {
  const articleData = await fetchAPI<{ articles: { data: Article[] } }>(
    `
      query GetArticleBySlug($slug: String) {
        articles(filters: { slug: { eq: $slug }}) {
          data {
            id
            attributes {
              title
              excerpt
              slug
              content
              image {
                data {
                  attributes {
                    alternativeText
                    url
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
      `,
    {
      variables: {
        slug,
      },
    }
  );

  return articleData.articles.data[0];
}
