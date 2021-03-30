import { request } from "graphql-request";

export default function fetcher(query: string, variables?: object) {
  return request(
    `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/graphql`,
    query,
    variables
  );
}
