// let's assume `input` is string and not `RequestInfo` to make logic less complicated.
// TODO: make `input` work with `RequestInfo`
export default async function fetcher<T>(
  input: string,
  init?: RequestInit | undefined
) {
  // native fetch should be sufficient https://nextjs.org/blog/next-9-4#improved-built-in-fetch-support
  const res = await fetch(
    // if the URL is relative, we prepend NEXT_PUBLIC_API_BASE
    input.startsWith("http")
      ? input
      : `${process.env.NEXT_PUBLIC_API_BASE ?? "/api"}${input}`,
    init
  );

  if (!res.ok) {
    return null;
  }

  return res.json() as Promise<T>;
}
