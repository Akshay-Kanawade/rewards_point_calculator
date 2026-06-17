import PropTypes from 'prop-types';
import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';

const TableHeader = ({ columns, order, orderBy, onSort }) => (
  <TableHead>
    <TableRow>
      {columns.map((column) => (
        <TableCell key={column.id}>
          {column.sortable ? (
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : 'asc'}
              onClick={() => onSort(column.id)}
            >
              {column.label}
            </TableSortLabel>
          ) : (
            column.label
          )}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
      sortValue: PropTypes.func,
    })
  ).isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string,
  onSort: PropTypes.func.isRequired,
};

TableHeader.defaultProps = {
  orderBy: '',
};

export default TableHeader;
