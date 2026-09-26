import { Page, Locator } from '@playwright/test';

/**
 * CheckoutStepOnePage – Page Object for /checkout-step-one.html
 * Input IDs discovered via live exploration: #first-name, #last-name, #postal-code
 */
export class CheckoutStepOnePage {
  readonly page: Page;

  readonly pageTitle: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle       = page.locator('[data-test="title"]');
    this.firstNameInput  = page.locator('#first-name');
    this.lastNameInput   = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton  = page.locator('[data-test="continue"]');
    this.cancelButton    = page.locator('[data-test="cancel"]');
    this.errorMessage    = page.locator('[data-test="error"]');
  }

  /** Fill in checkout information and continue */
  async fillAndContinue(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
    await this.page.waitForURL('**/checkout-step-two.html');
  }

  /** Click Continue without filling any fields (negative test) */
  async clickContinueWithEmptyFields(): Promise<void> {
    await this.continueButton.click();
  }

  /** Returns the validation error message text */
  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible' });
    return await this.errorMessage.innerText();
  }

  /** Click Cancel */
  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }
}

