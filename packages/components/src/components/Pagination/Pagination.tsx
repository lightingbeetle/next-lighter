import React, { ComponentProps } from "react";
import Icon from "../Icon";
import PaginationNumber from "./PaginationNumber";
import cx from "classnames";

// FIXME:
// - Focus is not handled properly on click on sibling page after next page appears

type PaginationProps = {
  page: number;
  totalPages: number;
  onSetPage?: (page: number) => void;
  getHref: (page) => ComponentProps<typeof PaginationNumber>["href"];
  replace?: boolean;
} & ComponentProps<"nav">;

const Pagination = ({
  page,
  totalPages,
  onSetPage,
  className,
  getHref,
  replace,
  ...props
}: PaginationProps) => {
  const arrayOfPages = getArrayOfPages(page, totalPages);

  return (
    <nav
      className={cx("pagination", className)}
      aria-label="Stránkovanie"
      {...props}
    >
      <ul className="pagination__list">
        <li className="pagination__list-item">
          <PaginationNumber
            href={getHref(page > 1 ? page - 1 : 1)}
            type="arrow"
            onClick={() => {
              onSetPage?.(page > 1 ? page - 1 : 1);
            }}
            aria-label="Predchádzajúca stránka"
            isDisabled={page === 1}
          >
            <Icon name="chevron-up" />
          </PaginationNumber>
        </li>
        {arrayOfPages.map((pageIndex, index) => {
          if (typeof pageIndex === "number") {
            return (
              <li key={index.toString()} className="pagination__list-item">
                <PaginationNumber
                  type="number"
                  href={getHref(pageIndex)}
                  key={pageIndex}
                  isActive={page === pageIndex}
                  onClick={() => {
                    onSetPage?.(pageIndex);
                  }}
                  aria-current={pageIndex === page ? "page" : undefined}
                  aria-label={`Stránka ${pageIndex}`}
                >
                  {pageIndex}
                </PaginationNumber>
              </li>
            );
          } else {
            return (
              <li key={index.toString()} className="pagination__list-item">
                <span>...</span>
              </li>
            );
          }
        })}
        <li className="pagination__list-item">
          <PaginationNumber
            type="arrow"
            href={getHref(page < totalPages ? page + 1 : totalPages)}
            onClick={() => {
              onSetPage?.(page < totalPages ? page + 1 : totalPages);
            }}
            aria-label="Nasledujúca stránka"
            isDisabled={page === totalPages}
          >
            <Icon name="chevron-down" />
          </PaginationNumber>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

/**
 * Page generation is based on https://github.com/mui-org/material-ui/blob/49b3469442d45329df59e524fd31a2ce6ff311cc/packages/mui-material/src/usePagination/usePagination.js#L38
 */
function getArrayOfPages(page: number, totalPages: number) {
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const startPages = [1];
  const endPages = [totalPages];

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      page - 1,
      // Lower boundary when page is high
      totalPages - 3
    ),
    // Greater than startPages
    3
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      page + 1,
      // Upper boundary when page is low
      3
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : totalPages - 1
  );

  // Basic list of items to render
  // e.g. itemList = [1, 'ellipsis', 4, 5, 6, 'ellipsis', 10]
  return [
    ...startPages,

    // Start ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsStart > 3 ? ["ellipsis"] : 2 < totalPages - 1 ? [2] : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsEnd < totalPages - 2
      ? ["ellipsis"]
      : totalPages - 1 > 1
      ? [totalPages - 1]
      : []),

    ...(totalPages > 1 ? endPages : []),
  ];
}
