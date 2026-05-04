import { useMemo, useState } from "react";
import { useMediaQuery } from "./useMediaQuery";

export const usePagination = ({
  items = [],
  mobilePageSize = 5,
  desktopPageSize = 10,
}) => {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const pageSize = isMobile ? mobilePageSize : desktopPageSize;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(items.length / pageSize));
  }, [items.length, pageSize]);

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedItems = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * pageSize;

    return items.slice(startIndex, startIndex + pageSize);
  }, [items, safeCurrentPage, pageSize]);

  const goPrevious = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const goNext = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const handlePageChange = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  return {
    currentPage: safeCurrentPage,
    pageSize,
    totalPages,
    paginatedItems,
    setCurrentPage: handlePageChange,
    goPrevious,
    goNext,
  };
};
