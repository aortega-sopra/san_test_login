import {
  browser,
  by,
  element,
  ElementArrayFinder,
  ElementFinder,
  promise,
} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText(): promise.Promise<string> {
    return element(by.css('.title')).getText();
  }

  getSubmitButton(): ElementFinder {
    return element(by.css('.button'));
  }

  getErrors(): ElementArrayFinder {
    return element.all(by.css('.error'));
  }

  getEmailInput(): ElementFinder {
    return element(by.css('input[type="email"]'));
  }

  getPasswordInput(): ElementFinder {
    return element(by.css('input[type="password"]'));
  }
}
