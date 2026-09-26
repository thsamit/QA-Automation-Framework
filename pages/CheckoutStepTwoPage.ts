import { Page, Locator } from '@playwright/test';

/**
 * CheckoutStepTwoPage – Page Object for /checkout-step-two.html (overview)
 */
export class CheckoutStepTwoPage {
  readonly page: Page;

  readonly pageTitle: Locator;
  readonly orderItems: Locator;
  readonly orderItemNames: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle      = page.locator('[data-test="title"]');
    this.orderItems     = page.locator('[data-test="inventory-item"]');
    this.orderItemNames = page.locator('[data-test="inventory-item-name"]');
    this.subtotalLabel  = page.locator('.summary_subtotal_label');
    this.taxLabel       = page.locator('.summary_tax_label');
    this.totalLabel     = page.locator('.summary_total_label');
    this.finishButton   = page.locator('[data-test="finish"]');
    this.cancelButton   = page.locator('[data-test="cancel"]');
  }

  /** Returns the subtotal text e.g. "Item total: $39.98" */
  async getSubtotal(): Promise<string> {
    return await this.subtotalLabel.innerText();
  }

  /** Returns the tax text e.g. "Tax: $3.20" */
  async getTax(): Promise<string> {
    return await this.taxLabel.innerText();
  }

  /** Returns the total text e.g. "Total: $43.18" */
  async getTotal(): Promise<string> {
    return await this.totalLabel.innerText();
  }

  /** Returns the list of item names in the order overview */
  async getOrderItemNames(): Promise<string[]> {
    return await this.orderItemNames.allInnerTexts();
  }

  /** Click Finish to place the order */
  async clickFinish(): Promise<void> {
    await this.finishButton.click();
    await this.page.waitForURL('**/checkout-complete.html');
  }

  /** Click Cancel to go back to inventory */
  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
    await this.page.waitForURL('**/inventory.html');
  }
}

