import React, { createContext, useCallback, useContext } from "react";
import { useMemo } from "react";
import {
  useQueryParams,
  NumberParam,
  BooleanParam,
  ArrayParam,
  withDefault,
  encodeQueryParams,
} from "use-query-params";
import useSWR from "swr";
import { getAvailableFlats } from "../queries/flats";
import { stringify } from "query-string";
import { useRouter } from "next/router";

type FlatsFilterBase = {
  rooms: {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
    "1,5": number;
  };
  price_from: number;
  price_to: number;
  has_balcony: boolean;
};

type FlatsFilter = {
  price_from: number;
  price_to: number;
  has_balcony: boolean;
  rooms: string[];
};

type UseFlatsData = {
  data: any[];
  filter?: FlatsFilter;
  error: Error;
  filterBase?: FlatsFilterBase;
  page: number;
  totalPages: number;
  countOfActiveFilters: number;
  resetFilter: () => void;
  isLoading: boolean;
};

type UseFlatsCallbacks = {
  setPage: (page: UseFlatsData["page"]) => void;
  setFilter: (filter: UseFlatsData["filter"]) => void;
};

type UseFlats = UseFlatsData & UseFlatsCallbacks;

const FlatsContext = createContext<UseFlats>(undefined);

const queryParamsTypes = {
  has_balcony: BooleanParam,
  price_from: NumberParam,
  price_to: NumberParam,
  rooms: ArrayParam,
  page: withDefault(NumberParam, 1),
};

export const UseFlatsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // we need to be sure that next/router is ready to be sure query string is sync
  const { isReady: queryIsReady } = useRouter();

  /*
  / 1. Get query from url
  / Goal here is to store all filters in the URL (and not useState), so state of filter could be read from URL as well, when user want's to visit page with prefiltered data
  */
  const [query, setQuery] = useQueryParams(queryParamsTypes);

  /*
  / 2. Fetch data for current query
  */
  const { data: fetchedData, error } = useSWR(
    // don't fetch data until query (next/router) is ready
    queryIsReady &&
      `/flats?${stringify(encodeQueryParams(queryParamsTypes, query))}`,
    getAvailableFlats
  );

  /*
  / 3. Derivate all information from fetched data - data, filterBase, filter and totalPages
  */
  // Data about flats
  // useMemo hook helps to make variabiles stable but it's probably not necessary
  const data = useMemo(() => fetchedData?.data, [fetchedData?.data]);

  // Data about flats filter base eg. available options, min/max-es etc.
  const filterBase = useMemo(() => {
    if (!fetchedData?.filter) {
      return undefined;
    }

    return {
      rooms: fetchedData?.filter.rooms,
      price_from: parseInt(fetchedData?.filter.price_from),
      price_to: parseInt(fetchedData?.filter.price_to),
      has_balcony: !!fetchedData?.filter.has_balcony,
    };
  }, [fetchedData?.filter]);

  // current state of the filter
  const filter = useMemo(() => {
    if (!fetchedData?.filter) {
      return undefined;
    }

    return getFilterQuery({ filter: query, filterBase });
  }, [query, filterBase, fetchedData?.filter]);

  // We count only filter parameters from url so count is recalculated only on filter change
  const countOfActiveFilters = useMemo(
    () => getCountOfActiveFilters({ query }),
    [query]
  );

  // total pages
  const totalPages = Math.ceil(parseInt(fetchedData?.count) / 15);

  /*
  / 4. Actions
  */
  const resetFilter = useCallback(() => {
    setQuery({
      price_from: undefined,
      price_to: undefined,
      has_balcony: undefined,
      rooms: undefined,
      page: undefined,
    });
  }, [setQuery]);

  /*
  / 5. Provider value to consume by consumers
  */
  const value = useMemo(
    () => ({
      data,
      error,
      filter,
      filterBase,
      page: query.page,
      setFilter: (value) => {
        // reset page after filtering, because we don't know how many pages we will get back
        setQuery({
          ...getFilterQuery({ filter: value, filterBase }),
          page: undefined,
        });
      },
      setPage: (page) => {
        setQuery(getPageQuery({ page }));
      },
      totalPages,
      countOfActiveFilters,
      resetFilter,
      isLoading: !filterBase,
    }),
    [
      filter,
      error,
      filterBase,
      query.page,
      totalPages,
      countOfActiveFilters,
      resetFilter,
      data,
      setQuery,
    ]
  );

  return (
    <FlatsContext.Provider value={value}>{children}</FlatsContext.Provider>
  );
};

export function useFlats() {
  const context = useContext(FlatsContext);
  if (!context) {
    throw new Error(
      `Flats compound components cannot be rendered outside the Flats component`
    );
  }
  return context;
}

export default useFlats;

const getFilterQuery = ({
  filter,
  filterBase,
}: {
  filter: FlatsFilter;
  filterBase: FlatsFilterBase;
}) => {
  return {
    has_balcony: filter?.has_balcony || undefined,
    price_from:
      filter?.price_from === filterBase?.price_from
        ? undefined
        : filter?.price_from || filterBase?.price_from,
    price_to:
      filter?.price_to === filterBase?.price_to
        ? undefined
        : filter.price_to || filterBase?.price_to,
    rooms:
      makeEmptyAndAllParamsSame(
        Object.entries(filterBase?.rooms || {}).map((room) => room[0]) ?? [],
        filter?.rooms ?? []
      ) || undefined,
  };
};

const getPageQuery = ({ page }) => {
  return { page: page !== 1 ? page : undefined };
};

function makeEmptyAndAllParamsSame(
  availableParams: string[],
  currentParams: string[]
) {
  const currentParamsAsArray = !Array.isArray(currentParams)
    ? [currentParams]
    : currentParams;

  return arrayHasSameContent(availableParams, currentParamsAsArray)
    ? null
    : currentParams;
}

function arrayHasSameContent(a: string[], b: string[]) {
  if (a.length !== b.length) {
    return false;
  }

  const sortedA = a.sort();
  const sortedB = b.sort();

  return sortedA.every((element, index) => element === sortedB[index]);
}

// Naive counting where we check if some filter parameters are in the url params
function getCountOfActiveFilters({ query }) {
  let count = 0;

  // count two price range values as one filter change
  if (query.price_from || query.price_to) {
    count++;
  }

  if (query.rooms) {
    count++;
  }

  if (query.has_balcony) {
    count++;
  }

  return count;
}
