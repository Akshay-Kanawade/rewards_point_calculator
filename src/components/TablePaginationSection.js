import PropTypes from 'prop-types';
import { TablePagination } from '@mui/material';

const TablePaginationSection = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => (
  <TablePagination
    component="div"
    count={count}
    page={page}
    rowsPerPage={rowsPerPage}
    onPageChange={onPageChange}
    onRowsPerPageChange={onRowsPerPageChange}
    rowsPerPageOptions={[5, 10, 25, 50]}
  />
);

TablePaginationSection.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
};

export default TablePaginationSection;
