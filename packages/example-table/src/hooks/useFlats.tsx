import React, { createContext, useCallback, useContext } from "react";
import { useRouter } from "next/dist/client/router";
import { useEffect, useMemo, useState } from "react";
import { SortingRule } from "react-table";
import useSWR from "swr";
import {
  parseUrl as parseURLToQuery,
  stringify as stringifyQuery,
} from "query-string";
import { getAvailableFlats } from "../queries/flats";

type FlatsFilterShape = {
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
  has_garden: number;
  finished_indicator: number;
  new_in_sale_indicator: number;
  top_floor_indicator: number;
  lowest_floor_indicator: number;
};

type FlatsFilter = {
  areaFrom: string;
  areaTo: string;
  floorFrom: string;
  floorTo: string;
  hidePreReserved: boolean;
  priceFrom: string;
  priceTo: string;
  projects: string | string[];
  rooms: string | string[];
  showApartments: boolean;
  has_balcony: boolean;
  has_garden: boolean;
  has_terrace: boolean;
  finished_indicator: boolean;
  lowest_floor_indicator: boolean;
  top_floor_indicator: boolean;
  new_in_sale_indicator: boolean;
};

type UseFlatsData = {
  data: any[];
  error: Error;
  filter: FlatsFilter;
  filterShape: FlatsFilterShape;
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
  projects,
}: {
  children: React.ReactNode;
  projects?: FlatsFilter["projects"];
}) => {
  /*
  / Parse URL initial to states
  */
  const { asPath, replace, basePath } = useRouter();

  // We are not using query from useRouter, because it is empty object durring first render for some reason. But asPath is correct.
  const { query } = parseURLToQuery(asPath, { arrayFormat: "bracket" });

  // then state is used to current query params
  const [filter, setFilter] = useState<UseFlats["filter"]>({
    has_balcony: !!query.has_balcony || null,
    has_garden: !!query.has_garden || null,
    has_terrace: !!query.has_terrace || null,
    finished_indicator: !!query.finished_indicator || null,
    lowest_floor_indicator: !!query.lowest_floor_indicator || null,
    top_floor_indicator: !!query.top_floor_indicator || null,
    new_in_sale_indicator: !!query.new_in_sale_indicator || null,
    areaFrom: (query.area_from as string) || null,
    areaTo: (query.area_to as string) || null,
    floorFrom: (query.floor_from as string) || null,
    floorTo: (query.floor_to as string) || null,
    hidePreReserved: query.hidePreReserved ? true : false,
    priceFrom: (query.price_from as string) || null,
    priceTo: (query.price_to as string) || null,
    projects: projects || query.project,
    rooms: query.rooms,
    showApartments: query.showApartments ? true : false,
  });

  const [filterShape, setFilterShape] = useState<FlatsFilterShape>();

  const [page, setPage] = useState<UseFlats["page"]>(
    parseInt(query.page as string) || 1
  );

  const [sortBy, setSortBy] = useState<UseFlats["sortBy"]>(
    query.sortBy
      ? [
          {
            id: query.sortBy as string,
            desc: query.sortOrder === "DSC",
          },
        ]
      : []
  );

  /*
  / Update URL params based on the current state
  */
  const urlParamsAsStringForAPI = getUrlParamsAsString({
    filter,
    filterShape,
    page,
    sortBy,
  });

  /*
  / Fetch data of current state
  */
  const { data, error } = useSWR(
    // [`https://api.slnecnice.sk/api/flats?${urlParamsAsStringForAPI}`],
    `/flats?${urlParamsAsStringForAPI}`,
    getAvailableFlats
  );

  const memoizedData = useMemo(() => data?.data, [data?.data]);

  const totalPages = Math.ceil(parseInt(data?.count) / 15);

  /*
  / Cound some data based on current state
  */
  // We count only filter parameters from url so count is recalculated only on filter change
  const countOfActiveFilters = useMemo(
    () => getCountOfActiveFilters(urlParamsAsStringForAPI),
    [filter]
  );

  /*
  / Replace URL params with current params
  */
  useEffect(() => {
    const urlParamsAsString = getUrlParamsAsString({
      ...query,
      filter,
      filterShape,
      page,
      sortBy,
      hideDefaults: true,
    });

    replace(
      `${basePath}${urlParamsAsString && `?${urlParamsAsString}`}${
        document.location.hash
      }`,
      null,
      {
        shallow: true,
        scroll: false,
      }
    );
    // page is not here, becasue we use Link to change page due accesibility reasons and Link will update URL params by themself
  }, [sortBy, filter]);

  /*
  / Set current filter shape and update default base on that shape
  */
  useEffect(() => {
    if (data?.filter) {
      setFilterShape({ ...data?.filter });

      // set default base on the shape
      setFilter({
        ...filter,
        ...(filter.priceFrom === null && {
          priceFrom: data?.filter.price_from,
        }),
        ...(filter.priceTo === null && { priceTo: data?.filter.price_to }),
        ...(filter.areaFrom === null && { areaFrom: data?.filter.area_from }),
        ...(filter.areaTo === null && { areaTo: data?.filter.area_to }),
        ...(filter.floorFrom === null && {
          floorFrom: data?.filter.floor_from,
        }),
        ...(filter.floorTo === null && { floorTo: data?.filter.floor_to }),
      });
    }
  }, [data]);

  /*
  / Ability to reset filter
  */

  const resetFilter = useCallback(() => {
    setFilter({
      has_balcony: null,
      has_garden: null,
      has_terrace: null,
      finished_indicator: null,
      lowest_floor_indicator: null,
      top_floor_indicator: null,
      new_in_sale_indicator: null,
      priceFrom: filterShape.price_from,
      priceTo: filterShape.price_to,
      areaFrom: filterShape.area_from,
      areaTo: filterShape.area_to,
      floorFrom: filterShape.floor_from,
      floorTo: filterShape.floor_to,
      rooms: null,
      projects: null,
      hidePreReserved: false,
      showApartments: false,
    });

    setPage(1);
  }, [filterShape]);

  /*
  / Put data and state into context
  */
  const value = useMemo(
    () => ({
      data: memoizedData,
      error,
      filter,
      filterShape,
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
      isLoading: !filterShape,
    }),
    [
      data,
      error,
      filter,
      filterShape,
      page,
      setFilter,
      setPage,
      setSortBy,
      sortBy,
      totalPages,
      countOfActiveFilters,
      resetFilter,
      projects,
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

function getUrlParamsAsString({
  filter,
  filterShape,
  page,
  sortBy,
  hideDefaults,
  ...other
}: {
  filter: UseFlats["filter"];
  filterShape: FlatsFilterShape;
  page: UseFlatsData["page"];
  sortBy: UseFlatsData["sortBy"];
  hideDefaults?: boolean;
}) {
  return stringifyQuery(
    {
      ...other,
      ...(filter && {
        status: [
          !hideDefaults ? "Y" : null,
          !filter.hidePreReserved ? "P" : null,
        ],
        has_balcony: filter.has_balcony || null,
        has_garden: filter.has_garden || null,
        has_terrace: filter.has_terrace || null,
        finished_indicator: filter.finished_indicator || null,
        lowest_floor_indicator: filter.lowest_floor_indicator || null,
        top_floor_indicator: filter.top_floor_indicator || null,
        new_in_sale_indicator: filter.new_in_sale_indicator || null,
        area_from:
          filter.areaFrom === filterShape?.area_from ? null : filter.areaFrom,
        area_to: filter.areaTo === filterShape?.area_to ? null : filter.areaTo,
        floor_from:
          filter.floorFrom === filterShape?.floor_from
            ? null
            : filter.floorFrom,
        floor_to:
          filter.floorTo === filterShape?.floor_to ? null : filter.floorTo,
        hidePreReserved: filter.hidePreReserved ? true : null,
        price_from:
          filter.priceFrom === filterShape?.price_from
            ? null
            : filter.priceFrom,
        price_to:
          filter.priceTo === filterShape?.price_to ? null : filter.priceTo,
        project: filter.projects || null,
        rooms:
          makeEmptyAndAllParamsSame(
            Object.entries(filterShape?.rooms ?? {}).map((room) => room[0]) ??
              [],
            filter.rooms ?? []
          ) || null,
        showApartments: filter.showApartments ? true : null,
      }),
      ...(page && { page: page !== 1 ? page.toString() : null }),
      ...(sortBy.length && {
        sort: `${sortBy[0].desc ? "-" : ""}${sortBy[0].id}`,
      }),
    },
    {
      arrayFormat: "bracket",
      skipEmptyString: true,
      skipNull: true,
    }
  );
}

function makeEmptyAndAllParamsSame(
  availableParams: string[],
  currentParams: string | string[]
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
function getCountOfActiveFilters(urlParamsAsString) {
  let count = 0;

  // we count priceFrom and priceTo parameter as one filter change
  if (urlParamsAsString.includes("price")) {
    count++;
  }

  if (urlParamsAsString.includes("area")) {
    count++;
  }

  if (urlParamsAsString.includes("room")) {
    count++;
  }

  if (urlParamsAsString.includes("floor")) {
    count++;
  }

  if (urlParamsAsString.includes("project")) {
    count++;
  }

  if (urlParamsAsString.includes("has_")) {
    count++;
  }

  if (
    urlParamsAsString.includes("showApartments") ||
    urlParamsAsString.includes("hidePreReserved")
  ) {
    count++;
  }

  return count;
}
