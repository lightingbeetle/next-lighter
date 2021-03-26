import { request } from "graphql-request";

export default function fetcher(query, variables) {
  return request(
    `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/graphql`,
    query,
    variables
  );
}
