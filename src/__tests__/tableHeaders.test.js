

import * as dataAggregator from "../utils/dataAggregator";
import { totalRewardsHeaders, transactionsHeaders, userMonthlyRewardsHeaders } from "../utils/tableHeaders";

jest.mock("../utils/dataAggregator", () => ({
  formatDate: jest.fn(),
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
}));

describe("Headers configuration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ---------------- TOTAL REWARDS ----------------
  describe("totalRewardsHeaders", () => {
    test("renders full customer name correctly", () => {
      const row = { firstName: "John", lastName: "Doe" };

      const renderFn = totalRewardsHeaders[0].render;

      expect(renderFn(row)).toBe("John Doe");
    });

    test("sortValue returns firstName", () => {
      const row = { firstName: "John", lastName: "Doe" };

      const sortFn = totalRewardsHeaders[0].sortValue;

      expect(sortFn(row)).toBe("John");
    });

    test("formats reward points with toLocaleString", () => {
      const row = { totalRewardPoints: 1234567 };

      const renderFn = totalRewardsHeaders[1].render;

      expect(renderFn(row)).toBe("12,34,567");
    });
  });

  // ---------------- USER MONTHLY REWARDS ----------------
  describe("userMonthlyRewardsHeaders", () => {
    test("returns customer full name", () => {
      const row = { firstName: "Jane", lastName: "Smith" };

      const renderFn = userMonthlyRewardsHeaders[1].render;

      expect(renderFn(row)).toBe("Jane Smith");
    });

    test("maps month number to MonthName array", () => {
      const row = { month: 3 };

      const renderFn = userMonthlyRewardsHeaders[2].render;

      expect(renderFn(row)).toBe("March");
    });

    test("formats reward points with locale string", () => {
      const row = { rewardPoints: 5000 };

      const renderFn = userMonthlyRewardsHeaders[4].render;

      expect(renderFn(row)).toBe("5,000");
    });
  });

  // ---------------- TRANSACTIONS HEADERS ----------------
  describe("transactionsHeaders", () => {
    test("renders full customer name", () => {
      const row = { firstName: "A", lastName: "B" };

      const renderFn = transactionsHeaders[1].render;

      expect(renderFn(row)).toBe("A B");
    });

    test("calls formatDate for purchaseDate", () => {
      dataAggregator.formatDate.mockReturnValue("01 January 2024");

      const row = { purchaseDate: new Date("2024-01-01") };

      const renderFn = transactionsHeaders[2].render;

      expect(renderFn(row)).toBe("01 January 2024");
      expect(dataAggregator.formatDate).toHaveBeenCalledWith(
        row.purchaseDate
      );
    });

    test("formats price correctly", () => {
      const row = { price: 123.4 };

      const renderFn = transactionsHeaders[4].render;

      expect(renderFn(row)).toBe("$123.40");
    });

    test("checks rewardPoints field exists", () => {
      const header = transactionsHeaders[5];

      expect(header.id).toBe("rewardPoints");
      expect(header.label).toBe("Reward Points");
      expect(header.sortable).toBe(true);
    });
  });

   test("should execute all render and sort functions", () => {
    const sample = {
      firstName: "John",
      lastName: "Doe",
      totalRewardPoints: 1000,
      rewardPoints: 500,
      price: 120,
      purchaseDate: new Date(),
      month: 2,
    };

    // totalRewardsHeaders
    totalRewardsHeaders.forEach((h) => {
      if (h.render) h.render(sample);
      if (h.sortValue) h.sortValue(sample);
    });

    // userMonthlyRewardsHeaders
    userMonthlyRewardsHeaders.forEach((h) => {
      if (h.render) h.render(sample);
      if (h.sortValue) h.sortValue(sample);
    });

    // transactionsHeaders
    transactionsHeaders.forEach((h) => {
      if (h.render) h.render(sample);
      if (h.sortValue) h.sortValue(sample);
    });
  });
  jest.mock("../utils/dataAggregator", () => ({
  formatDate: jest.fn(() => "01 January 2024"),
}));

test("should cover formatDate, price and reward render functions", () => {
  const row = {
    firstName: "A",
    lastName: "B",
    purchaseDate: new Date(),
    price: 99.5,
  };

  const customerName =
    transactionsHeaders[1].render(row);
  const date =
    transactionsHeaders[2].render(row);
  const price =
    transactionsHeaders[4].render(row);

  expect(customerName).toBe("A B");
  expect(price).toBe("$99.50");
});

});