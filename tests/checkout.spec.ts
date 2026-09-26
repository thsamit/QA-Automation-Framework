import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

/**
 * TC-007: Verify navigation and information entry on Checkout: Your Information
 * TC-008: Verify validation on Checkout Step One when required fields are empty
 * TC-009: Verify Checkout: Overview displays correct items and subtotal
 * TC-010: Verify order completion and confirmation message
 */
test.describe('Checkout Process', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('TC-007 | Enter checkout information and continue to overview', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const stepOnePage = new CheckoutStepOnePage(page);

    // Add 2 items and go to cart
    await inventoryPage.addBackpackToCart();
    await inventoryPage.addBikeLightToCart();
    await inventoryPage.goToCart();

    // Click checkout
    await cartPage.clickCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    // Fill info and continue
    await stepOnePage.fillAndContinue('John', 'Doe', '12345');

    // Should redirect to overview page
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
    const stepTwoPage = new CheckoutStepTwoPage(page);
    await expect(stepTwoPage.pageTitle).toHaveText('Checkout: Overview');
  });

  test('TC-008 | Leave checkout step one fields blank and verify validation error', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const stepOnePage = new CheckoutStepOnePage(page);

    await inventoryPage.goToCart();
    await cartPage.clickCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    // Click continue without filling fields
    await stepOnePage.clickContinueWithEmptyFields();

    // Validation error should be displayed
    const errorText = await stepOnePage.getErrorMessage();
    expect(errorText).toContain('Error: First Name is required');
  });

  test('TC-009 | Verify checkout overview displays items and correct subtotal', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const stepOnePage = new CheckoutStepOnePage(page);
    const stepTwoPage = new CheckoutStepTwoPage(page);

    // Add items ($29.99 + $9.99)
    await inventoryPage.addBackpackToCart();
    await inventoryPage.addBikeLightToCart();
    await inventoryPage.goToCart();
    await cartPage.clickCheckout();

    await stepOnePage.fillAndContinue('John', 'Doe', '12345');
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);

    // Verify items in overview
    const itemNames = await stepTwoPage.getOrderItemNames();
    expect(itemNames).toContain('Sauce Labs Backpack');
    expect(itemNames).toContain('Sauce Labs Bike Light');

    // Verify subtotal ($29.99 + $9.99 = $39.98)
    const subtotal = await stepTwoPage.getSubtotal();
    expect(subtotal).toContain('Item total: $39.98');
  });

  test('TC-010 | Complete order and confirm thank you message is displayed', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const stepOnePage = new CheckoutStepOnePage(page);
    const stepTwoPage = new CheckoutStepTwoPage(page);
    const completePage = new CheckoutCompletePage(page);

    // Add items, fill info, reach overview
    await inventoryPage.addBackpackToCart();
    await inventoryPage.addBikeLightToCart();
    await inventoryPage.goToCart();
    await cartPage.clickCheckout();
    await stepOnePage.fillAndContinue('John', 'Doe', '12345');

    // Finish checkout
    await stepTwoPage.clickFinish();
    await expect(page).toHaveURL(/.*checkout-complete\.html/);

    // Verify confirmation message
    const header = await completePage.getConfirmationHeader();
    expect(header).toContain('Thank you for your order!');
  });

});

