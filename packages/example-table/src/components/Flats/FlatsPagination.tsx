import React from "react";
import { Pagination } from "components";
import useFlats from "../../hooks/useFlats";

const FlatsPagination = () => {
  const { page, totalPages, setPage } = useFlats();

  return (
    <div className="flats__pagination">
      {totalPages > 1 && (
        <Pagination
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
