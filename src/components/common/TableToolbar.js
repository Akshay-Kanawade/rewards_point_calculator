import PropTypes from "prop-types";
import {
  Box,
  Typography,
  TextField,
} from "@mui/material";

const TableToolbar = ({
  title,
  searchInput,
  onSearchChange,
}) => (
  <Box
    sx={{
      mb: 1,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Typography variant="h6">
      {title}
    </Typography>

    <TextField
      size="small"
      placeholder="Search..."
      value={searchInput}
      onChange={onSearchChange}
    />
  </Box>
);

TableToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  searchInput: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default TableToolbar;