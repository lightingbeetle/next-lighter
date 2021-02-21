// This is copy-paste from next-server utils, because Next.js is not exposing this and we need it to replicate getting files from build manifest to support custom Head and NextScripts

import { posix } from "path";
import micromatch from "micromatch";

function normalizePathSep(path: string): string {
  return path.replace(/\\/g, "/");
}

function denormalizePagePath(page: string) {
  page = normalizePathSep(page);
  if (page.startsWith("/index/")) {
    page = page.slice(6);
  } else if (page === "/index") {
    page = "/";
  }
  return page;
}

function normalizePagePath(page: string): string {
  // If the page is `/` we need to append `/index`, otherwise the returned directory root will be bundles instead of pages
  if (page === "/") {
    page = "/index";
  } else if (/^\/index(\/|$)/.test(page)) {
    page = `/index${page}`;
  }
  // Resolve on anything that doesn't start with `/`
  if (!page.startsWith("/")) {
    page = `/${page}`;
  }
  // Throw when using ../ etc in the pathname
  const resolvedPage = posix.normalize(page);
  if (page !== resolvedPage) {
    throw new Error(
      `Requested and resolved page mismatch: ${page} ${resolvedPage}`
    );
  }
  return page;
}

export type BuildManifest = {
  devFiles: readonly string[];
  ampDevFiles: readonly string[];
  polyfillFiles: readonly string[];
  lowPriorityFiles: readonly string[];
  pages: {
    "/_app": readonly string[];
    [page: string]: readonly string[];
  };
  ampFirstPages: readonly string[];
};

export function getPageFiles(
  buildManifest: BuildManifest,
  page: string
): readonly string[] {
  const normalizedPage = denormalizePagePath(normalizePagePath(page));
  let files = buildManifest.pages[normalizedPage];

  if (!files) {
    console.warn(
      `Could not find files for ${normalizedPage} in .next/build-manifest.json`
    );
    return [];
  }

  return files;
}

export type DocumentFiles = {
  sharedFiles: readonly string[];
  pageFiles: readonly string[];
  allFiles: readonly string[];
};

export function getDocumentFiles(
  buildManifest: BuildManifest,
  pathname: string
): DocumentFiles {
  const sharedFiles: readonly string[] = getPageFiles(buildManifest, "/_app");
  const pageFiles: readonly string[] = getPageFiles(buildManifest, pathname);

  return {
    sharedFiles,
    pageFiles,
    // @ts-ignore
    allFiles: [...new Set([...sharedFiles, ...pageFiles])],
  };
}

export function getStaticDocumentFiles(
  buildManifest: BuildManifest,
  pathname: string,
  staticFiles: string[]
): DocumentFiles {
  const sharedFiles: readonly string[] = micromatch(
    getPageFiles(buildManifest, "/_app"),
    ["static/chunks/webpack*.js"]
  );
  const pageFiles: readonly string[] = micromatch(
    getPageFiles(buildManifest, pathname),
    ["static/chunks/webpack*.js"]
  );

  return {
    sharedFiles,
    pageFiles,
    // @ts-ignore
    allFiles: [...new Set([...sharedFiles, ...pageFiles, ...staticFiles])],
  };
}
