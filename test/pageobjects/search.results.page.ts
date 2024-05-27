import Page from "./page";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SearchResultsPage extends Page {
  /**
   * method to interact with a result based on the contact name
   * @param name - The contact name to search for
   */
  public async interactWithResultByName(name: string) {
    const contactLink = $(`//a[text()="${name}"]`);
    await contactLink.waitForDisplayed();
    await contactLink.click();
  }
}
export default new SearchResultsPage();
