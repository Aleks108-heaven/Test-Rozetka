import { Page, Locator } from "@playwright/test";

export class SearchResultsPage {
  readonly page: Page;
  readonly productCards: Locator;
  readonly productTitles: Locator;
  readonly productPrices: Locator;
  readonly sortSelect: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator("article");
    this.productTitles = page.locator("a.tile-title, a.goods-tile__heading");
    this.productPrices = page.locator(
      "article div.price, span.goods-tile__price-value",
    );
    this.sortSelect = page.locator("select.select-css");
  }

  async waitForResults() {
    await this.page.waitForLoadState("domcontentloaded");
    await this.productCards
      .first()
      .waitFor({ state: "visible", timeout: 30000 });
  }

  async sortByCheap() {
    await this.sortSelect.selectOption({ label: "Від дешевих до дорогих" });
    await this.page.waitForLoadState("networkidle");
    await this.waitForResults();
  }

  async sortByExpensive() {
    await this.sortSelect.selectOption({ label: "Від дорогих до дешевих" });
    await this.page.waitForLoadState("networkidle");
    await this.waitForResults();
  }

  async getProductPrices(): Promise<number[]> {
    await this.waitForResults();
    const count = await this.productCards.count();
    const prices: number[] = [];
    const limit = Math.min(count, 10);
    for (let i = 0; i < limit; i++) {
      const card = this.productCards.nth(i);
      const priceEl = card
        .locator("div.price, span.goods-tile__price-value")
        .first();
      const text = await priceEl
        .textContent({ timeout: 5000 })
        .catch(() => null);
      if (text) {
        const price = parseInt(text.replace(/[^\d]/g, ""), 10);
        if (!isNaN(price) && price > 0) {
          prices.push(price);
        }
      }
    }
    return prices;
  }

  async getProductTitles(): Promise<string[]> {
    await this.waitForResults();
    const count = await this.productTitles.count();
    const titles: string[] = [];
    const limit = Math.min(count, 10);
    for (let i = 0; i < limit; i++) {
      const text = await this.productTitles.nth(i).textContent();
      if (text) {
        titles.push(text.trim());
      }
    }
    return titles;
  }

  async getResultsCount(): Promise<string> {
    const countElement = this.page.locator("text=Знайдено").first();
    const text = await countElement.textContent({ timeout: 10000 });
    return text?.trim() || "";
  }

  async clickProduct(index: number) {
    await this.productTitles.nth(index).click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async hasProducts(): Promise<boolean> {
    const count = await this.productCards.count();
    return count > 0;
  }
}
