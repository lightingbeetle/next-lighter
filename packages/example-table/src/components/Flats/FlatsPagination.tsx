import React from "react";
import { Pagination } from "components";
import useFlats from "../../hooks/useFlats";
import { useRouter } from "next/router";

const FlatsPagination = () => {
  const { page, totalPages, setPage } = useFlats();
  const { basePath } = useRouter();

  return (
    <div className="flats__pagination">
      {totalPages > 1 && (
        <Pagination
          getHref={(page) => `${basePath}?page=${page}`}
          replace
          page={page}
          totalPages={totalPages}
          onSetPage={setPage}
        />
      )}
    </div>
  );
};

export default FlatsPagination;
