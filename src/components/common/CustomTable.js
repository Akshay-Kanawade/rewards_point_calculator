import { memo } from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Table,
  TableContainer,
  Typography,
  Box,
} from "@mui/material";

import TableToolbar from "./TableToolbar";
import TableHeader from "./TableHeader";
import TableContent from "./TableContent";
import TablePaginationSection from "./TablePaginationSection";
import useTable from "../../hooks/useTable";

const CustomTable = ({
  title,
  columns,
  data,
  noDataMessage,
  loading,
}) => {
  const {
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
  } = useTable(data, columns);

  return (
    <Paper
      elevation={2}
      sx={{ p: 2, mb: 1, minHeight: 380 }}
    >
      <TableToolbar
        title={title}
        searchInput={searchInput}
        onSearchChange={handleSearchChange}
      />



      {processedData.length > 0 ||
      loading ? (
        <>
          <TableContainer
            sx={{
              height: 380,
              overflow: "auto",
            }}
          >
           
            <Table
              stickyHeader
              size="small"
              sx={{
                "& .MuiTableCell-head":
                  {
                    backgroundColor:
                      "#e8e8e8",
                    color: "black",
                    fontWeight: 600,
                  },
              }}
            >
              <TableHeader
                columns={columns}
                order={order}
                orderBy={orderBy}
                onSort={handleRequestSort}
              />

              <TableContent
                data={paginatedData}
                columns={columns}
              />
            </Table>
          </TableContainer>

          <TablePaginationSection
            count={
              processedData.length
            }
            page={page}
            rowsPerPage={
              rowsPerPage
            }
            onPageChange={
              handlePageChange
            }
            onRowsPerPageChange={
              handleRowsPerPageChange
            }
          />
        </>
      ) : (
        <Box sx={{ py: 3 }}>
          <Typography align="center">
            {noDataMessage}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

CustomTable.propTypes = {
  title: PropTypes.string.isRequired,

  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      align: PropTypes.string,
      render: PropTypes.func,
      sortable: PropTypes.bool,
      sortValue: PropTypes.func,
    })
  ).isRequired,

  data: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,

  noDataMessage: PropTypes.string,

  loading: PropTypes.bool,
};

CustomTable.defaultProps = {
  noDataMessage: "No data available",
  loading: false,
};

export default memo(CustomTable);