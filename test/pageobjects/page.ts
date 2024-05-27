import { browser } from "@wdio/globals";

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class Page {
  public open(path: string) {
    return browser.url(`https://online-qa-test.ccdemo.site/`);
  }
  public getNameSelector(name: string) {
    return $(`//a[text()="${name}"]`);
  }
}
