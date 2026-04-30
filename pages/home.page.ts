import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('input[name="search"]');
    this.searchButton = page.getByRole("button", { name: "Знайти" });
  }

  async goto() {
    await this.page.goto("/ua/", { waitUntil: "domcontentloaded" });
    await this.dismissPopups();
  }

  async dismissPopups() {
    try {
      const cookieBtn = this.page.locator(
        'button:has-text("Прийняти"), button:has-text("Зрозуміло")',
      );
      await cookieBtn.click({ timeout: 3000 });
    } catch {
      // No popup — continue
    }
  }

  async search(query: string) {
    await this.page.goto(`/ua/search/?text=${encodeURIComponent(query)}`, {
      waitUntil: "domcontentloaded",
    });
  }

  async searchViaUI(query: string) {
    await this.searchInput.click();
    await this.searchInput.fill(query);
    // Close autocomplete by clicking outside
    await this.page.locator("header").first().click({ force: true });
    await this.searchButton.click();
    await this.page.waitForURL("**/search/**", { timeout: 15000 });
    await this.page.waitForLoadState("domcontentloaded");
  }
}
