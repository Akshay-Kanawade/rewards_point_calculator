export const filterData = (data, searchText) => {
  if (!searchText?.trim()) {
    return [...data];
  }

  return data.filter((row) =>
    Object.values(row).some((value) =>
      String(value ?? '')
        .trim()
        .toLowerCase()
        .includes(searchText.trim().toLowerCase())
    )
  );
};

export const sortData = (data, columns, orderBy, order) => {
  if (!orderBy) {
    return data;
  }

  const column = columns.find((col) => col.id === orderBy);

  return [...data].sort((a, b) => {
    const valueA = column?.sortValue ? column.sortValue(a) : a[orderBy];

    const valueB = column?.sortValue ? column.sortValue(b) : b[orderBy];

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return order === 'asc' ? valueA - valueB : valueB - valueA;
    }

    return order === 'asc'
      ? String(valueA).localeCompare(String(valueB), undefined, {
          sensitivity: 'base',
        })
      : String(valueB).localeCompare(String(valueA), undefined, {
          sensitivity: 'base',
        });
  });
};

export const paginateData = (data, page, rowsPerPage) => {
  const start = page * rowsPerPage;

  return data.slice(start, start + rowsPerPage);
};
