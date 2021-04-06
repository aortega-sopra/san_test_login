import { assertNotNull } from '@angular/compiler/src/output/output_ast';
import { browser, ElementFinder, protractor } from 'protractor';
import { AppPage } from './app.po';

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should navigate to login page', async () => {
    await page.navigateTo();

    const baseUrl = await browser.getCurrentUrl();

    expect(baseUrl).toContain('login');
  });

  it('should render login form', async () => {
    await page.navigateTo();

    const title = await page.getParagraphText();

    expect(title).toBe('Prueba técnica');
  });

  it('should show errors with empty values', async () => {
    await page.navigateTo();

    await submitForm(page);

    await validateErrors(page, 2);
  });


  it('should show errors with invalid values', async () => {
    await page.navigateTo();

    await enterFormValues(page, 'invalidEmail', 'invp');
    await submitForm(page);

    await validateErrors(page, 2);
  });

  it('should show password error', async () => {
    await page.navigateTo();

    await enterFormValues(page, 'validEmail@domain.any', 'invp');
    await submitForm(page);

    await validateErrors(page, 1);
  });


  it('should not have errors with valid values', async () => {
    await page.navigateTo();

    await enterFormValues(page, 'validEmail@domain.any', 'validPassword');
    await submitForm(page);

    await validateErrors(page, 0);
  });
});

async function submitForm(page: AppPage) {
  const button: ElementFinder = page.getSubmitButton();
  await button.click();
}

async function validateErrors(page: AppPage, expectedErrors: number) {
  const errors: ElementFinder[] = await page.getErrors();
  expect(errors.length).toBe(expectedErrors);
}

async function enterFormValues(page: AppPage, email: string, password: string) {
  const emailInput: ElementFinder = page.getEmailInput();
  await emailInput.clear();
  await emailInput.sendKeys(email);

  const passwordInput: ElementFinder = page.getPasswordInput();
  await passwordInput.clear();
  await passwordInput.sendKeys(password);
}
