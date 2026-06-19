import PropTypes from "prop-types";
import { TableBody } from "@mui/material";
import MemoizedTableRow from "./TableRow";

const TableContent = ({
  data,
  columns,
}) => (
  <TableBody>
    {data.map((row) => (
      <MemoizedTableRow
        key={
          row.id ??
          `${row.customerId}-${row.month}-${row.year}`
        }
        row={row}
        columns={columns}
      />
    ))}
  </TableBody>
);

TableContent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      render: PropTypes.func,
      align: PropTypes.string,
    })
  ).isRequired,
};

export default TableContent;