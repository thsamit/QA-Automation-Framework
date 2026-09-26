import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

/**
 * TC-004: Verify adding Sauce Labs Backpack to the cart
 * TC-005: Verify adding multiple items (Backpack and Bike Light) and cart badge count
 * TC-006: Verify cart contents match added items
 */
test.describe('Cart & Inventory', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('TC-004 | Add Sauce Labs Backpack to cart and verify badge count and button state', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addBackpackToCart();

    // Verify remove button appears with text "Remove"
    const removeBtnText = await inventoryPage.getRemoveBackpackButtonText();
    expect(removeBtnText.trim()).toBe('Remove');

    // Verify cart badge displays "1"
    const badgeCount = await inventoryPage.getCartBadgeCount();
    expect(badgeCount).toBe('1');
  });

  test('TC-005 | Add multiple items and verify cart badge count updates to 2', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addBackpackToCart();
    await inventoryPage.addBikeLightToCart();

    // Verify cart badge displays "2"
    const badgeCount = await inventoryPage.getCartBadgeCount();
    expect(badgeCount).toBe('2');
  });

  test('TC-006 | Navigate to cart and verify added items, prices, and checkout button', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addBackpackToCart();
    await inventoryPage.addBikeLightToCart();
    await inventoryPage.goToCart();

    // Verify cart URL
    await expect(page).toHaveURL(/.*cart\.html/);

    // Verify items in cart
    const itemNames = await cartPage.getCartItemNames();
    expect(itemNames).toContain('Sauce Labs Backpack');
    expect(itemNames).toContain('Sauce Labs Bike Light');

    // Verify prices in cart
    const itemPrices = await cartPage.getCartItemPrices();
    expect(itemPrices).toContain('$29.99');
    expect(itemPrices).toContain('$9.99');

    // Verify checkout button is visible and enabled
    await expect(cartPage.checkoutButton).toBeVisible();
    await expect(cartPage.checkoutButton).toBeEnabled();
  });

});

