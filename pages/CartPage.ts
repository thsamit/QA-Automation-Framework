import { Page, Locator } from '@playwright/test';

/**
 * CartPage – Page Object for /cart.html
 */
export class CartPage {
  readonly page: Page;

  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly cartItemNames: Locator;
  readonly cartItemPrices: Locator;
  readonly cartItemQuantities: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle               = page.locator('[data-test="title"]');
    this.cartItems               = page.locator('[data-test="inventory-item"]');
    this.cartItemNames           = page.locator('[data-test="inventory-item-name"]');
    this.cartItemPrices          = page.locator('[data-test="inventory-item-price"]');
    this.cartItemQuantities      = page.locator('[data-test="item-quantity"]');
    this.checkoutButton          = page.locator('[data-test="checkout"]');
    this.continueShoppingButton  = page.locator('[data-test="continue-shopping"]');
  }

  /** Returns all item names in the cart */
  async getCartItemNames(): Promise<string[]> {
    return await this.cartItemNames.allInnerTexts();
  }

  /** Returns all item prices in the cart */
  async getCartItemPrices(): Promise<string[]> {
    return await this.cartItemPrices.allInnerTexts();
  }

  /** Returns all item quantities in the cart */
  async getCartItemQuantities(): Promise<string[]> {
    return await this.cartItemQuantities.allInnerTexts();
  }

  /** Returns the number of items in the cart */
  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /** Click Checkout button */
  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
    await this.page.waitForURL('**/checkout-step-one.html');
  }

  /** Click Continue Shopping */
  async clickContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
    await this.page.waitForURL('**/inventory.html');
  }
}

