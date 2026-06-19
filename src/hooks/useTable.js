import {
  useState,
  useMemo,
  useCallback,
  useDeferredValue,
} from "react";

import {
  filterData,
  sortData,
  paginateData,
} from "../utils/tableUtils";

/**
 * Custom hook for managing table state and operations.
 *
 * Features:
 * - Client-side searching
 * - Column sorting
 * - Pagination
 * - Deferred search updates for better performance
 *
 * @param {Array<Object>} data - Table data to be displayed.
 * @param {Array<Object>} columns - Column configuration array.
 * @param {string} columns[].id - Unique column identifier.
 * @param {string} columns[].label - Column display label.
 *
 * @returns {Object} Table state and handlers.
 * @returns {string} returns.searchInput Current search text.
 * @returns {"asc"|"desc"} returns.order Current sort direction.
 * @returns {string} returns.orderBy Currently sorted column.
 * @returns {number} returns.page Current page number.
 * @returns {number} returns.rowsPerPage Number of rows displayed per page.
 * @returns {Array<Object>} returns.processedData Filtered and sorted data.
 * @returns {Array<Object>} returns.paginatedData Current page data.
 * @returns {Function} returns.handleSearchChange Updates search input.
 * @returns {Function} returns.handleRequestSort Handles column sorting.
 * @returns {Function} returns.handlePageChange Handles page changes.
 * @returns {Function} returns.handleRowsPerPageChange Handles page size changes.
 *
 * @example
 * const {
 *   paginatedData,
 *   page,
 *   rowsPerPage,
 *   handlePageChange,
 *   handleSearchChange,
 * } = useTable(users, columns);
 */
const useTable = (data, columns) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] =
    useState(10);
  const [order, setOrder] =
    useState("asc");
  const [orderBy, setOrderBy] =
    useState("");
  const [searchInput, setSearchInput] =
    useState("");

  const deferredSearch =
    useDeferredValue(searchInput);

  /**
   * Handles sorting when a column header is clicked.
   *
   * @param {string} columnId - Column identifier.
   */
  const handleRequestSort = useCallback(
    (columnId) => {
      setOrder((prev) =>
        orderBy === columnId &&
        prev === "asc"
          ? "desc"
          : "asc"
      );

      setOrderBy(columnId);
    },
    [orderBy]
  );

  /**
   * Handles search input changes.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleSearchChange = useCallback(
    (event) => {
      setSearchInput(event.target.value);
      setPage(0);
    },
    []
  );

  /**
   * Handles page changes.
   *
   * @param {unknown} _ Ignored event parameter.
   * @param {number} newPage New page index.
   */
  const handlePageChange = useCallback(
    (_, newPage) => {
      setPage(newPage);
    },
    []
  );

  /**
   * Handles rows-per-page changes.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleRowsPerPageChange =
    useCallback((event) => {
      setRowsPerPage(
        Number(event.target.value)
      );
      setPage(0);
    }, []);

  const processedData = useMemo(() => {
    const filtered = filterData(
      data,
      deferredSearch
    );

    return sortData(
      filtered,
      columns,
      orderBy,
      order
    );
  }, [
    data,
    columns,
    deferredSearch,
    order,
    orderBy,
  ]);

  const paginatedData = useMemo(
    () =>
      paginateData(
        processedData,
        page,
        rowsPerPage
      ),
    [
      processedData,
      page,
      rowsPerPage,
    ]
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