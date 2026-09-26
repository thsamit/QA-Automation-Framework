import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

/**
 * TC-001: Verify standard login with valid credentials
 * TC-002: Verify login attempt with invalid password
 * TC-003: Verify login attempt with blank credentials
 * TC-011: Verify login with locked_out_user (expected to FAIL – known issue)
 */
test.describe('Login Functionality', () => {

  test('TC-001 | Standard login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Should redirect to inventory page
    await expect(page).toHaveURL(/.*inventory\.html/);

    // Page title should be "Products"
    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.pageTitle).toHaveText('Products');
  });

  test('TC-002 | Login with invalid password shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'wrong_sauce');

    // Should remain on login page (URL unchanged)
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('TC-003 | Login with empty credentials shows validation error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.clickLoginWithEmptyFields();

    await expect(page).toHaveURL('https://www.saucedemo.com/');

    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Epic sadface: Username is required');
  });

  test('TC-011 | Login with locked_out_user should succeed [KNOWN ISSUE]', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    // Expected: redirect to inventory. Actual: locked out error.
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

});

