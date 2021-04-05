import { GraphQLClient } from "graphql-request";

export default function fetcher(query: string, variables?: object) {
  const graphQLClient = new GraphQLClient(
    `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/graphql`,
    {
      headers: {
        authorization: `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`,
      },
    }
  );

  return graphQLClient.request(query, variables);
}
