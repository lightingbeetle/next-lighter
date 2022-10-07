import qs from "qs";

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 */
export async function fetchAPI<T>(
  path: string,
  urlParamsObject: { [x: string]: string } = {},
  options: RequestInit = {}
): Promise<T> {
  // Merge default and user options
  const { headers = {}, ...otherOptions } = options;
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...otherOptions,
  };

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`;

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);

  // Handle response
  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occured please try again`);
  }
  const data = await response.json();
  return data;
}

/**
 * Helper to make GET authentificated requests to Strapi API endpoints
 */
export async function fetchAPIWithAuth<T>(
  path: string,
  urlParamsObject: { [x: string]: string } = {},
  options: RequestInit = {}
): Promise<T> {
  // TODO: how to reuse fetchAPI types for fetchAPIWithAuth?
  const { headers = {}, ...otherOptions } = options;
  return fetchAPI(path, urlParamsObject, {
    headers: { Authorization: "Bearer " + process.env.API_TOKEN, ...headers },
    ...otherOptions,
  });
}
