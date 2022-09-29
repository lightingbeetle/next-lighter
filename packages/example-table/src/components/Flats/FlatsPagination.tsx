import React from "react";
import { Pagination } from "components";
import useFlats from "../../hooks/useFlats";
import { useRouter } from "next/router";
import { stringify } from "query-string";

const FlatsPagination = () => {
  const { page, totalPages, setPage } = useFlats();
  const { basePath, query, push } = useRouter();

  function handleSetPage(
    page: number,
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    // Pagination don't use next/link so we can prevent default href event a navigate manuly with next/router to get smooth navigation
    e.preventDefault();
    push(`/filter?${stringify({ ...query, page })}`);
  }

  return (
    <Pagination
      getHref={(page) => `${basePath}/filter?${stringify({ ...query, page })}`}
      page={page}
      totalPages={totalPages}
      onSetPage={handleSetPage}
    />
  );
};

export default FlatsPagination;
