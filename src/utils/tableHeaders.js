import { formatDate, monthNames } from './dataAggregator';

export const totalRewardsHeaders = [
  {
    id: 'customerName',
    label: 'Customer Name',
    render: (row) => `${row.firstName} ${row.lastName}`,
    sortValue: (row) => `${row.firstName}`,
    sortable: true,
  },
  {
    id: 'totalRewardPoints',
    label: 'Total Reward Points',
    className: 'points-column',
    sortable: true,
    render: (row) => row.totalRewardPoints.toLocaleString(),
  },
];

export const userMonthlyRewardsHeaders = [
  {
    id: 'customerId',
    label: 'Customer ID',
    sortable: true,
  },
  {
    id: 'customerName',
    label: 'Customer Name',
    render: (row) => `${row.firstName} ${row.lastName}`,
    sortValue: (row) => `${row.firstName}`,
    sortable: true,
  },
  {
    id: 'month',
    label: 'Month',
    render: (row) => monthNames[row.month - 1],
    sortable: false,
  },
  {
    id: 'year',
    label: 'Year',
    sortable: false,
  },
  {
    id: 'rewardPoints',
    label: 'Reward Points',
    className: 'points-column',
    sortable: true,
    render: (row) => row.rewardPoints.toLocaleString(),
  },
];

export const transactionsHeaders = [
  {
    id: 'id',
    label: 'Transaction ID',
    sortable: true,
  },
  {
    id: 'customerName',
    label: 'Customer Name',
    render: (row) => `${row.firstName} ${row.lastName}`,
    sortValue: (row) => `${row.firstName}`,
    sortable: true,
  },
  {
    id: 'purchaseDate',
    label: 'Purchase Date',
    render: (row) => formatDate(row.purchaseDate),
    sortable: true,
  },
  {
    id: 'productName',
    label: 'Product',
    sortable: true,
  },
  {
    id: 'price',
    label: 'Price',
    className: 'price-column',
    render: (row) => `$${row.price.toFixed(2)}`,
    sortable: true,
  },
  {
    id: 'rewardPoints',
    label: 'Reward Points',
    className: 'points-column',
    sortable: true,
  },
];
