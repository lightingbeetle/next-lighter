import React, { createContext, useCallback, useContext, useRef } from "react";
import { useRouter } from "next/dist/client/router";
import { useEffect, useMemo, useState } from "react";
import { SortingRule } from "react-table";
import {
  useQueryParams,
  NumberParam,
  BooleanParam,
  StringParam,
  ArrayParam,
  withDefault,
  encodeQueryParams,
} from "next-query-params";
import useSWR from "swr";
import { getAvailableFlats } from "../queries/flats";
import { stringify } from "query-string";

type FlatsFilterBase = {
  project: { [projectName: string]: number };
  building: { [buildingName: string]: number };
  status: {
    P: number;
    R: number;
    S: number;
    Y: number;
  };
  type: {
    APA: number;
    BYT: number;
  };
  rooms: {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
    "1,5": number;
  };
  price_from: string;
  price_to: string;
  area_from: string;
  area_to: string;
  floor_from: string;
  floor_to: string;
  has_balcony: number;
  has_terrace: number;
  finished_indicator: number;
  new_in_sale_indicator: number;
  top_floor_indicator: number;
  lowest_floor_indicator: number;
};

type FlatsFilter = {
  price_from: string;
  price_to: string;
  has_balcony: boolean;
  rooms: string[];
};

type UseFlatsData = {
  data: any[];
  error: Error;
  filter: FlatsFilter;
  filterBase: FlatsFilterBase;
  page: number;
  sortBy: SortingRule<string>[];
  totalPages: number;
  countOfActiveFilters: number;
  resetFilter: () => void;
  isLoading: boolean;
};

type UseFlatsCallbacks = {
  setPage: (page: UseFlatsData["page"]) => void;
  setSortBy: (sortBy: UseFlatsData["sortBy"]) => void;
  setFilter: (filter: UseFlatsData["filter"]) => void;
};

type UseFlats = UseFlatsData & UseFlatsCallbacks;

const FlatsContext = createContext<UseFlats>(undefined);

export const UseFlatsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  /*
  / Parse URL initial to states
  */
  const { query: routerQuery } = useRouter();

  // This is the reason why query is empty on first render
  // https://stackoverflow.com/questions/66909552/userouter-query-object-is-empty
  const queryParamsTypes = {
    has_balcony: BooleanParam,
    price_from: StringParam,
    price_to: StringParam,
    rooms: ArrayParam,
    page: withDefault(NumberParam, 1),
    sort: StringParam,
    sortOrder: StringParam,
  };
  const [query, setQuery] = useQueryParams(queryParamsTypes);

  // then state is used to current query params
  const [filter, setFilter] = useState<UseFlats["filter"]>({
    has_balcony: undefined,
    price_from: undefined,
    price_to: undefined,
    rooms: undefined,
  });

  const [filterBase, setfilterBase] = useState<FlatsFilterBase>();
  const [page, setPage] = useState<UseFlats["page"]>(query.page);
  const [sortBy, setSortBy] = useState<UseFlats["sortBy"]>(
    getSortBy({ query })
  );

  /*
  / Fetch data of current state
  */
  const { data, error } = useSWR(
    // [`https://api.slnecnice.sk/api/flats?${stringify(encodeQueryParams(queryParamsTypes, query))}`],
    `/flats?${stringify(encodeQueryParams(queryParamsTypes, query))}`,
    getAvailableFlats
  );

  const memoizedData = useMemo(() => data?.data, [data?.data]);

  const totalPages = Math.ceil(parseInt(data?.count) / 15);

  /*
  / Cound some data based on current state
  */
  // We count only filter parameters from url so count is recalculated only on filter change
  const countOfActiveFilters = useMemo(
    () => getCountOfActiveFilters({ query }),
    [query]
  );

  /**
   * We need to wait for the first render because on the first render
   * is routerQuery empty, so the server side and client side are same pages
   *
   * On the second render we can use routerQuery and parse url if possible
   */
  const isFirstRender = useRef(true);
  const isQueryParsed = useRef(false);

  // Parse URL and set states
  useEffect(() => {
    if (!isFirstRender.current && !isQueryParsed.current) {
      // parse only if url has some params to avoid reseting values
      if (Object.keys(routerQuery).length !== 0) {
        const { has_balcony, price_from, price_to, rooms } = routerQuery;
        setFilter({
          has_balcony: !!has_balcony || undefined,
          price_from: (price_from as string) || undefined,
          price_to: (price_to as string) || undefined,
          rooms: rooms ? (!Array.isArray(rooms) ? [rooms] : rooms) : undefined,
        });
        setSortBy(getSortBy({ query: routerQuery }));
      }
      isQueryParsed.current = true;
    }
    isFirstRender.current = false;
  }, [routerQuery, isFirstRender.current, isQueryParsed.current]);

  /**
   * Replace URL params with current state values
   * but after first render and parsing a first query
   */
  useEffect(() => {
    if (!isFirstRender.current && isQueryParsed.current) {
      setQuery({
        ...getFilterQuery({ filter, filterBase }),
        ...getPageQuery({ page }),
        ...getSortQuery({ sortBy }),
      });
    }
    // page is not here, becasue we use Link to change page due accesibility reasons and Link will update URL params by themself
  }, [
    sortBy,
    filter,
    filterBase,
    isFirstRender.current,
    isQueryParsed.current,
  ]);

  /*
  / Set current filter shape and update default base on that shape
  */
  useEffect(() => {
    if (data?.filter) {
      setfilterBase({ ...data?.filter });

      // set default base on the shape
      setFilter({
        ...filter,
        ...(filter.price_from === undefined && {
          price_from: data?.filter.price_from,
        }),
        ...(filter.price_to === undefined && {
          price_to: data?.filter.price_to,
        }),
      });
    }
  }, [data]);

  /*
  / Ability to reset filter
  */

  const resetFilter = useCallback(() => {
    setFilter({
      price_from: filterBase?.price_from,
      price_to: filterBase?.price_to,
      has_balcony: undefined,
      rooms: undefined,
    });

    setPage(1);
  }, [filterBase]);

  /*
  / Put data and state into context
  */
  const value = useMemo(
    () => ({
      data: memoizedData,
      error,
      filter,
      filterBase,
      page,
      setFilter: (value) => {
        // reset page after filtering, because we don't know how many pages we will get back
        setPage(1);
        setFilter(value);
      },
      setPage,
      setSortBy,
      sortBy,
      totalPages,
      countOfActiveFilters,
      resetFilter,
      isLoading: !filterBase,
    }),
    [
      data,
      error,
      filter,
      filterBase,
      page,
      setFilter,
      setPage,
      setSortBy,
      sortBy,
      totalPages,
      countOfActiveFilters,
      resetFilter,
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

const getFilterQuery = ({ filter, filterBase }) => {
  return {
    has_balcony: !!filter?.has_balcony || undefined,
    price_from:
      parseInt(filter?.price_from) === parseInt(filterBase?.price_from)
        ? undefined
        : filter?.price_from,
    price_to:
      parseInt(filter?.price_to) === parseInt(filterBase?.price_to)
        ? undefined
        : filter.price_to,
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

const getSortQuery = ({ sortBy }) => {
  return {
    sort: sortBy.length
      ? `${sortBy[0].desc ? "-" : ""}${sortBy[0].id}`
      : undefined,
  };
};

function getSortBy({ query }) {
  return query.sort
    ? [
        {
          id: query.sort as string,
          desc: query.sortOrder === "DSC",
        },
      ]
    : [];
}

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
