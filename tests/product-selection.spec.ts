import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { SearchResultsPage } from "../pages/search-results.page";
import { ProductPage } from "../pages/product.page";

test.describe("Вибір та перегляд товарів на Rozetka", () => {
  let homePage: HomePage;
  let searchResults: SearchResultsPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchResults = new SearchResultsPage(page);
    productPage = new ProductPage(page);
  });

  test("Відкрити товар зі списку результатів пошуку", async ({ page }) => {
    await homePage.search("смартфон Samsung");
    await searchResults.waitForResults();

    await searchResults.clickProduct(0);

    const isLoaded = await productPage.isLoaded();
    expect(isLoaded).toBe(true);

    const title = await productPage.getTitle();
    expect(title.length).toBeGreaterThan(0);
  });

  test("Картка товару відображає ціну", async () => {
    await homePage.search("ноутбук Lenovo");
    await searchResults.waitForResults();

    await searchResults.clickProduct(0);

    const isLoaded = await productPage.isLoaded();
    expect(isLoaded).toBe(true);

    const price = await productPage.getPrice();
    expect(price).toBeGreaterThan(0);
  });

  test("Перехід між різними товарами із категорії телефонів", async ({
    page,
  }) => {
    await page.goto("/ua/mobile-phones/c80003/", {
      waitUntil: "domcontentloaded",
    });
    await searchResults.waitForResults();

    await searchResults.clickProduct(0);
    const firstTitle = await productPage.getTitle();
    expect(firstTitle.length).toBeGreaterThan(0);

    await page.goBack({ waitUntil: "domcontentloaded" });
    await searchResults.waitForResults();

    await searchResults.clickProduct(1);
    const secondTitle = await productPage.getTitle();
    expect(secondTitle.length).toBeGreaterThan(0);

    expect(firstTitle).not.toEqual(secondTitle);
  });

  test("Повернення до списку результатів після перегляду товару", async ({
    page,
  }) => {
    await homePage.search("планшет");
    await searchResults.waitForResults();

    const hasProducts = await searchResults.hasProducts();
    expect(hasProducts).toBe(true);

    await searchResults.clickProduct(0);
    await productPage.isLoaded();

    await page.goBack({ waitUntil: "domcontentloaded" });
    await searchResults.waitForResults();

    const stillHasProducts = await searchResults.hasProducts();
    expect(stillHasProducts).toBe(true);
  });

  test("Перегляд товару із відсортованого списку (від дешевих до дорогих)", async ({
    page,
  }) => {
    await page.goto("/ua/mobile-phones/c80003/", {
      waitUntil: "domcontentloaded",
    });
    await searchResults.waitForResults();
    await searchResults.sortByCheap();

    const listingPrices = await searchResults.getProductPrices();
    expect(listingPrices.length).toBeGreaterThan(0);

    await searchResults.clickProduct(0);
    const isLoaded = await productPage.isLoaded();
    expect(isLoaded).toBe(true);

    const productTitle = await productPage.getTitle();
    expect(productTitle.length).toBeGreaterThan(0);
  });

  test("Перегляд товару із відсортованого списку (від дорогих до дешевих)", async ({
    page,
  }) => {
    await page.goto("/ua/mobile-phones/c80003/", {
      waitUntil: "domcontentloaded",
    });
    await searchResults.waitForResults();
    await searchResults.sortByExpensive();

    const listingPrices = await searchResults.getProductPrices();
    expect(listingPrices.length).toBeGreaterThan(0);

    await searchResults.clickProduct(0);
    const isLoaded = await productPage.isLoaded();
    expect(isLoaded).toBe(true);

    const productPrice = await productPage.getPrice();
    expect(productPrice).toBeGreaterThan(0);
  });
});
