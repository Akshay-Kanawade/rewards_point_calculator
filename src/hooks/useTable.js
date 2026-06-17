import { useState, useMemo, useCallback, useDeferredValue } from 'react';

import { filterData, sortData, paginateData } from '../utils/tableUtils';

const useTable = (data, columns) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const deferredSearch = useDeferredValue(searchInput);

  const handleRequestSort = useCallback(
    (columnId) => {
      setOrder((prev) =>
        orderBy === columnId && prev === 'asc' ? 'desc' : 'asc'
      );

      setOrderBy(columnId);
    },
    [orderBy]
  );

  const handleSearchChange = useCallback((event) => {
    setSearchInput(event.target.value);
    setPage(0);
  }, []);

  const handlePageChange = useCallback((_, newPage) => {
    setPage(newPage);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  }, []);

  const processedData = useMemo(() => {
    const filtered = filterData(data, deferredSearch);

    return sortData(filtered, columns, orderBy, order);
  }, [data, columns, deferredSearch, order, orderBy]);

  const paginatedData = useMemo(
    () => paginateData(processedData, page, rowsPerPage),
    [processedData, page, rowsPerPage]
  );

  return {
    searchInput,
    order,
    orderBy,
    page,
    rowsPerPage,
    processedData,
    paginatedData,
    handleSearchChange,
    handleRequestSort,
    handlePageChange,
    handleRowsPerPageChange,
  };
};

export default useTable;
