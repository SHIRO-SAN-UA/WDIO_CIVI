import Page from "./page";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
  /**
   * define selectors using getter methods
   */
  public get searchButton() {
    return $(`//span[normalize-space()='Search']`);
  }
  public get findContactsButton() {
    return $(`//span[normalize-space()='Find Contacts']`);
  }
  public async clickFindContactsButton() {
    await this.searchButton.click();
    await this.findContactsButton.click();
  }
  async navigateToSearchPage() {
    await this.clickFindContactsButton();
  }
}

export default new HomePage();
