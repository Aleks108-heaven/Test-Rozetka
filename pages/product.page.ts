import { Page, Locator } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly title: Locator;
  readonly price: Locator;
  readonly buyButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator("h1.title__font");
    this.price = page.locator("p.product-price__big").first();
    this.buyButton = page
      .locator("button.buy-button")
      .filter({ hasText: "Купити" })
      .first();
  }

  async getTitle(): Promise<string> {
    const text = await this.title.textContent({ timeout: 15000 });
    return text?.trim() || "";
  }

  async getPrice(): Promise<number> {
    const text = await this.price.textContent({ timeout: 15000 });
    if (!text) return 0;
    return parseInt(text.replace(/[^\d]/g, ""), 10) || 0;
  }

  async isLoaded(): Promise<boolean> {
    try {
      await this.title.waitFor({ state: "visible", timeout: 15000 });
      return true;
    } catch {
      return false;
    }
  }
}
