/* eslint-disable @typescript-eslint/require-await */
import { filter } from "./../mocks/data/flats";
import fetch from "../lib/fetch";

// Object is native TS type so we need to rename our Object
import type { FlatObjectAttributesFromAPI } from "../mocks/data/objects";

export async function getAvailableFlats(url) {
  return await fetch<{
    data: FlatObjectAttributesFromAPI[];
    count: string;
    filter: typeof filter;
  }>(url);
}
