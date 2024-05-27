import Page from "./page";
import searchResultsPage from "./search.results.page";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SearchPage extends Page {
  /**
   * define selectors using getter methods
   */
  public get nameField() {
    return $(`#sort_name`);
  }
  public get dropdownInput() {
    return $(`#s2id_autogen1_search`);
  }
  public get individualOption() {
    return $(`#select2-result-label-25`);
  }
  public get householdOption() {
    return $(`#select2-result-label-26`);
  }
  public get organizationOption() {
    return $(`#select2-result-label-27`);
  }

  public get searchButton() {
    return $(`#_qf_Basic_refresh`);
  }
  /**
   * method to select an option from the dropdown
   * @param option - The option to select ('Individual', 'Household', 'Organization')
   */
  public async selectDropdownOption(option: string) {
    await this.dropdownInput.click();
    await this.dropdownInput.setValue(option);

    // Wait for the dropdown options to be displayed
    let optionElement;
    switch (option) {
      case "Individual":
        optionElement = this.individualOption;
        break;
      case "Household":
        optionElement = this.householdOption;
        break;
      case "Organization":
        optionElement = this.organizationOption;
        break;
      default:
        throw new Error(`Option ${option} is not valid`);
    }

    await optionElement.waitForDisplayed();
    await optionElement.click();
  }

  /**
   * method to perform search
   * @param name - The name to search for
   */
  public async searchForName(name: string) {
    await this.nameField.setValue(name);
    await this.searchButton.click();
  }
  async searchAndSelectContact(contactName: string) {
    await this.searchForName(contactName);
    await searchResultsPage.interactWithResultByName(contactName);
  }
}

export default new SearchPage();
