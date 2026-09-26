import { Page, Locator } from '@playwright/test';

/**
 * LoginPage – Page Object for https://www.saucedemo.com (login screen)
 */
export class LoginPage {
  readonly page: Page;

  // Locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput  = page.locator('#user-name');
    this.passwordInput  = page.locator('#password');
    this.loginButton    = page.locator('#login-button');
    this.errorMessage   = page.locator('[data-test="error"]');
  }

  /** Navigate to login page */
  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  /** Fill in credentials and click Login */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** Click Login without filling any fields */
  async clickLoginWithEmptyFields(): Promise<void> {
    await this.loginButton.click();
  }

  /** Returns the error message text */
  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible' });
    return await this.errorMessage.innerText();
  }
}

