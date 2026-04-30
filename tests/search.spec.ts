import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { SearchResultsPage } from "../pages/search-results.page";

test.describe("Пошук товарів на Rozetka", () => {
  let homePage: HomePage;
  let searchResults: SearchResultsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchResults = new SearchResultsPage(page);
  });

  test("Пошук смартфонів — результати містять релевантні товари", async () => {
    await homePage.search("смартфон");
    await searchResults.waitForResults();

    const titles = await searchResults.getProductTitles();
    expect(titles.length).toBeGreaterThan(0);
  });

  test("Пошук ноутбуків — результати завантажуються", async () => {
    await homePage.search("ноутбук");
    await searchResults.waitForResults();

    const titles = await searchResults.getProductTitles();
    expect(titles.length).toBeGreaterThan(0);
  });

  test("Пошук ноутбуків з процесором AMD Ryzen AI MAX — результати завантажуються", async () => {
    await homePage.search("Ноутбуки з процесором AMD Ryzen AI MAX");
    await searchResults.waitForResults();

    const titles = await searchResults.getProductTitles();
    expect(titles.length).toBeGreaterThan(0);
  });

  test("Пошук накопичувачів 2 ТБ і більше — результати завантажуються", async () => {
    await homePage.search("2 ТБ і більше");
    await searchResults.waitForResults();

    const titles = await searchResults.getProductTitles();
    expect(titles.length).toBeGreaterThan(0);
  });

  test("Пошук ноутбуків Apple — результати завантажуються", async () => {
    await homePage.search("Ноутбуки Apple");
    await searchResults.waitForResults();

    const titles = await searchResults.getProductTitles();
    expect(titles.length).toBeGreaterThan(0);
  });

  test("Пошук ноутбуків Apple з процесором M5 — результати завантажуються", async () => {
    await homePage.search("Ноутбуки Apple Процесор M5");
    await searchResults.waitForResults();

    const titles = await searchResults.getProductTitles();
    expect(titles.length).toBeGreaterThan(0);
  });

  test("Пошук ноутбуків Apple з процесором M4 1TB — результати завантажуються", async () => {
    await homePage.search("Ноутбуки Apple Процесор M4 1TB");
    await searchResults.waitForResults();

    const titles = await searchResults.getProductTitles();
    expect(titles.length).toBeGreaterThan(0);
  });

  test("Пошук iPhone 17 Air 256 — результати завантажуються", async () => {
    await homePage.search("iPhone 17 Air 256");
    await searchResults.waitForResults();

    const titles = await searchResults.getProductTitles();
    expect(titles.length).toBeGreaterThan(0);
  });

  test("Пошук Motorola 2026 12/256 — результати завантажуються", async () => {
    await homePage.search("Motorola 256 ГБ 2026");
    await searchResults.waitForResults();

    const titles = await searchResults.getProductTitles();
    expect(titles.length).toBeGreaterThan(0);
  });

  test("Пошук Motorola 2026 512 — результати завантажуються", async () => {
    await homePage.search("Motorola 512 ГБ 2026");
    await searchResults.waitForResults();

    const titles = await searchResults.getProductTitles();
    expect(titles.length).toBeGreaterThan(0);
  });

  test("Пошук планшетів — результати завантажуються", async () => {
    await homePage.search("планшет");
    await searchResults.waitForResults();

    const titles = await searchResults.getProductTitles();
    expect(titles.length).toBeGreaterThan(0);
  });

  test("Пошук телевізорів — результати завантажуються", async () => {
    await homePage.search("телевізор");
    await searchResults.waitForResults();

    const titles = await searchResults.getProductTitles();
    expect(titles.length).toBeGreaterThan(0);
  });

  test("Результати пошуку відображають кількість знайдених товарів", async () => {
    await homePage.search("навушники");
    await searchResults.waitForResults();

    const countText = await searchResults.getResultsCount();
    expect(countText).toContain("Знайдено");
  });

  test("Результати пошуку містять ціни товарів", async () => {
    await homePage.search("смартфон");
    await searchResults.waitForResults();

    const prices = await searchResults.getProductPrices();
    expect(prices.length).toBeGreaterThan(0);

    for (const price of prices) {
      expect(price).toBeGreaterThan(0);
    }
  });
});
