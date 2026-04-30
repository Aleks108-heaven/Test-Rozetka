import { test, expect } from "@playwright/test";
import { SearchResultsPage } from "../pages/search-results.page";

test.describe("Сортування товарів на Rozetka", () => {
  let searchResults: SearchResultsPage;

  test.beforeEach(async ({ page }) => {
    searchResults = new SearchResultsPage(page);
  });

  test.describe("Сортування мобільних телефонів", () => {
    test("Від дешевих до дорогих — ціни в порядку зростання", async ({
      page,
    }) => {
      await page.goto("/ua/mobile-phones/c80003/", {
        waitUntil: "domcontentloaded",
      });
      await searchResults.waitForResults();

      await searchResults.sortByCheap();

      const prices = await searchResults.getProductPrices();
      expect(prices.length).toBeGreaterThanOrEqual(2);

      for (let i = 1; i < prices.length; i++) {
        expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
      }
    });

    test("Від дорогих до дешевих — ціни в порядку спадання", async ({
      page,
    }) => {
      await page.goto("/ua/mobile-phones/c80003/", {
        waitUntil: "domcontentloaded",
      });
      await searchResults.waitForResults();

      await searchResults.sortByExpensive();

      const prices = await searchResults.getProductPrices();
      expect(prices.length).toBeGreaterThanOrEqual(2);

      for (let i = 1; i < prices.length; i++) {
        expect(prices[i]).toBeLessThanOrEqual(prices[i - 1]);
      }
    });
  });

  test.describe("Сортування ноутбуків", () => {
    test("Від дешевих до дорогих — ціни в порядку зростання", async ({
      page,
    }) => {
      await page.goto("/ua/notebooks/c80004/", {
        waitUntil: "domcontentloaded",
      });
      await searchResults.waitForResults();

      await searchResults.sortByCheap();

      const prices = await searchResults.getProductPrices();
      expect(prices.length).toBeGreaterThanOrEqual(2);

      for (let i = 1; i < prices.length; i++) {
        expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
      }
    });

    test("Від дорогих до дешевих — ціни в порядку спадання", async ({
      page,
    }) => {
      await page.goto("/ua/notebooks/c80004/", {
        waitUntil: "domcontentloaded",
      });
      await searchResults.waitForResults();

      await searchResults.sortByExpensive();

      const prices = await searchResults.getProductPrices();
      expect(prices.length).toBeGreaterThanOrEqual(2);

      for (let i = 1; i < prices.length; i++) {
        expect(prices[i]).toBeLessThanOrEqual(prices[i - 1]);
      }
    });
  });

  test.describe("Сортування планшетів", () => {
    test("Від дешевих до дорогих — ціни в порядку зростання", async ({
      page,
    }) => {
      await page.goto("/ua/tablets/c130309/", {
        waitUntil: "domcontentloaded",
      });
      await searchResults.waitForResults();

      await searchResults.sortByCheap();

      const prices = await searchResults.getProductPrices();
      expect(prices.length).toBeGreaterThanOrEqual(2);

      for (let i = 1; i < prices.length; i++) {
        expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
      }
    });

    test("Від дорогих до дешевих — ціни в порядку спадання", async ({
      page,
    }) => {
      await page.goto("/ua/tablets/c130309/", {
        waitUntil: "domcontentloaded",
      });
      await searchResults.waitForResults();

      await searchResults.sortByExpensive();

      const prices = await searchResults.getProductPrices();
      expect(prices.length).toBeGreaterThanOrEqual(2);

      for (let i = 1; i < prices.length; i++) {
        expect(prices[i]).toBeLessThanOrEqual(prices[i - 1]);
      }
    });
  });
});
