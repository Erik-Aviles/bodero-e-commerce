import React from "react";
import { Pagination, Button } from "@nextui-org/react";

const BottomPaginationContent = ({
  page,
  pages,
  setPage,
  onNextPage,
  onPreviousPage,
}) => (
  <div className="py-2 px-2 flex justify-between items-center">
    <Pagination
      isCompact
      showControls
      showShadow
      color="primary"
      page={page}
      total={pages}
      onChange={setPage}
    />
    <div className="hidden sm:flex w-[30%] justify-end gap-2">
      <Button
        isDisabled={pages === 1}
        size="sm"
        variant="flat"
        onPress={onPreviousPage}
      >
        Anterior
      </Button>
      <Button
        isDisabled={pages === 1}
        size="sm"
        variant="flat"
        onPress={onNextPage}
      >
        Siguiente
      </Button>
    </div>
  </div>
);

export default BottomPaginationContent;
