import { Page, Locator } from '@playwright/test';

/**
 * CheckoutCompletePage – Page Object for /checkout-complete.html
 */
export class CheckoutCompletePage {
  readonly page: Page;

  readonly pageTitle: Locator;
  readonly confirmationHeader: Locator;
  readonly confirmationText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle          = page.locator('[data-test="title"]');
    this.confirmationHeader = page.locator('.complete-header');
    this.confirmationText   = page.locator('.complete-text');
    this.backHomeButton     = page.locator('[data-test="back-to-products"]');
  }

  /** Returns the confirmation header text e.g. "Thank you for your order!" */
  async getConfirmationHeader(): Promise<string> {
    return await this.confirmationHeader.innerText();
  }

  /** Returns the confirmation body text */
  async getConfirmationText(): Promise<string> {
    return await this.confirmationText.innerText();
  }

  /** Click Back Home button */
  async clickBackHome(): Promise<void> {
    await this.backHomeButton.click();
    await this.page.waitForURL('**/inventory.html');
  }
}

