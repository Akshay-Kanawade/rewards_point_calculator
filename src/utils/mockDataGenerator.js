// Generate mock transaction data for testing and demonstration
// Pure function with no side effects

import dayjs from 'dayjs';
import { calculateRewardPoints } from './rewardsCalculator.js';

// Sample products
const PRODUCTS = [
  'Laptop',
  'Wireless Mouse',
  'USB-C Cable',
  'Monitor Stand',
  'Mechanical Keyboard',
  'Desk Lamp',
  'Phone Case',
  'Screen Protector',
  'Webcam',
  'Headphones',
  'External SSD',
  'Charging Dock',
  'Cable Organizer',
  'Desk Pad',
  'Notebook',
  'Pen Set',
  'Phone Stand',
  'Cable Clips',
  'Power Bank',
  'Bluetooth Speaker',
  'Gaming Mouse',
  'Gaming Headset',
  'Smart Watch',
  'Tablet',
  'Portable Monitor',
  'Wireless Charger',
  'Microphone',
  'Tripod',
  'Router',
  'Network Switch',
  'Graphics Tablet',
  'Printer',
  'Scanner',
  'Ink Cartridge',
  'Office Chair',
  'Standing Desk',
  'Laptop Sleeve',
  'Backpack',
  'HDMI Cable',
  'Ethernet Cable',
  'Smart Plug',
  'LED Strip Lights',
  'Ring Light',
  'Action Camera',
  'Memory Card',
  'Flash Drive',
  'Surge Protector',
  'Docking Station',
  'VR Headset',
  'Fitness Tracker',
];

// Sample customers
const CUSTOMERS = [
  { id: 'CUST001', firstName: 'John', lastName: 'Anderson' },
  { id: 'CUST002', firstName: 'Sarah', lastName: 'Mitchell' },
  { id: 'CUST003', firstName: 'Michael', lastName: 'Chen' },
  { id: 'CUST004', firstName: 'Emily', lastName: 'Johnson' },
  { id: 'CUST005', firstName: 'David', lastName: 'Williams' },
  { id: 'CUST006', firstName: 'Jennifer', lastName: 'Lee' },
  { id: 'CUST007', firstName: 'Robert', lastName: 'Martinez' },
  { id: 'CUST008', firstName: 'Jessica', lastName: 'Brown' },
  { id: 'CUST009', firstName: 'Christopher', lastName: 'Davis' },
  { id: 'CUST010', firstName: 'Amanda', lastName: 'Garcia' },
  { id: 'CUST011', firstName: 'Daniel', lastName: 'Rodriguez' },
  { id: 'CUST012', firstName: 'Ashley', lastName: 'Wilson' },
  { id: 'CUST013', firstName: 'Matthew', lastName: 'Moore' },
  { id: 'CUST014', firstName: 'Elizabeth', lastName: 'Taylor' },
  { id: 'CUST015', firstName: 'Joshua', lastName: 'Thomas' },
  { id: 'CUST016', firstName: 'Megan', lastName: 'Jackson' },
  { id: 'CUST017', firstName: 'Andrew', lastName: 'White' },
  { id: 'CUST018', firstName: 'Lauren', lastName: 'Harris' },
  { id: 'CUST019', firstName: 'Ryan', lastName: 'Martin' },
  { id: 'CUST020', firstName: 'Nicole', lastName: 'Thompson' },
];

/**
 * Generate a random price between min and max
 *
 * @param {number} min - Minimum price
 * @param {number} max - Maximum price
 * @returns {number} Random price
 */
const generateRandomPrice = (min, max) => {
  return Math.random() * (max - min) + min;
};

/**
 * Generate a random date within a date range
 *
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {Date} Random date within range
 */
const generateRandomDate = (
  startDate,
  endDate
) => {
  const start = startDate.valueOf();
  const end = endDate.valueOf();

  const randomTime =
    start + Math.random() * (end - start);

  return dayjs(randomTime);
};
/**
 * Generate mock transaction data
 * Creates 150-180 transactions spread across 3 months of 2026
 * ( April 2026, May 2026, June 2026)
 *
 * @returns {Array} Array of transaction objects
 */
const generateMockTransactions = () => {
  const transactions = [];
  let transactionId = 1;

  const months = [
    {
      name: 'April 2026',
      start: dayjs('2026-04-01'),
      end: dayjs('2026-04-30'),
    },
    {
      name: 'May 2026',
      start: dayjs('2026-05-01'),
      end: dayjs('2026-05-31'),
    },
    {
      name: 'June 2026',
      start: dayjs('2026-06-01'),
      end: dayjs(),
    },
  ];

  return CUSTOMERS.flatMap((customer) =>
    months.flatMap((month) =>
      Array.from({ length: 25 }, () => {
        const price = Number(
          generateRandomPrice(25, 250).toFixed(2)
        );

        const product =
          PRODUCTS[
            Math.floor(
              Math.random() * PRODUCTS.length
            )
          ];

        const purchaseDate = dayjs(
          generateRandomDate(month.start, month.end)
        ).format('MM-DD-YYYY');

        return {
          id: `TXN${String(
            transactionId++
          ).padStart(6, '0')}`,

          customerId: customer.id,
          firstName: customer.firstName,
          lastName: customer.lastName,

          purchaseDate,

          productName: product,

          price,

          rewardPoints:
            calculateRewardPoints(price),

          // month: month.name,
        };
      })
    )
  );
};

export { generateMockTransactions };
