import { Page, Locator } from '@playwright/test';

/**
 * InventoryPage – Page Object for /inventory.html
 */
export class InventoryPage {
  readonly page: Page;

  // Header / nav
  readonly pageTitle: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  // Product add-to-cart buttons (data-test attributes discovered via exploration)
  readonly addBackpackBtn: Locator;
  readonly addBikeLightBtn: Locator;
  readonly removeBackpackBtn: Locator;
  readonly removeBikeLightBtn: Locator;

  // All product names
  readonly productNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle          = page.locator('[data-test="title"]');
    this.cartLink           = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge          = page.locator('[data-test="shopping-cart-badge"]');
    this.addBackpackBtn     = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.addBikeLightBtn    = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.removeBackpackBtn  = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.removeBikeLightBtn = page.locator('[data-test="remove-sauce-labs-bike-light"]');
    this.productNames       = page.locator('[data-test="inventory-item-name"]');
  }

  /** Returns cart badge count as a string, or '0' if badge is not visible */
  async getCartBadgeCount(): Promise<string> {
    const visible = await this.cartBadge.isVisible();
    if (!visible) return '0';
    return await this.cartBadge.innerText();
  }

  /** Add Sauce Labs Backpack to cart */
  async addBackpackToCart(): Promise<void> {
    await this.addBackpackBtn.click();
  }

  /** Add Sauce Labs Bike Light to cart */
  async addBikeLightToCart(): Promise<void> {
    await this.addBikeLightBtn.click();
  }

  /** Returns the text of the remove button for Backpack */
  async getRemoveBackpackButtonText(): Promise<string> {
    return await this.removeBackpackBtn.innerText();
  }

  /** Navigate to cart page */
  async goToCart(): Promise<void> {
    await this.cartLink.click();
    await this.page.waitForURL('**/cart.html');
  }

  /** Returns all product names displayed on inventory page */
  async getAllProductNames(): Promise<string[]> {
    return await this.productNames.allInnerTexts();
  }
}

