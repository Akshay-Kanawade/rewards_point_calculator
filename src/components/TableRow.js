import { memo } from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@mui/material';

const MemoizedTableRow = memo(({ row, columns }) => (
  <TableRow hover>
    {columns.map((column) => (
      <TableCell key={column.id} align={column.align || 'left'}>
        {column.render ? column.render(row) : row[column.id]}
      </TableCell>
    ))}
  </TableRow>
));

MemoizedTableRow.displayName = 'MemoizedTableRow';

export default MemoizedTableRow;
MemoizedTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
};
