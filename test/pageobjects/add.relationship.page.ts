import contactPage from "./contact.page";
import Page from "./page";
/**
 * sub page containing specific selectors and methods for a specific page
 */
class AddRelationshipPage extends Page {
  public get cancelButton() {
    return $(`//button[@type='button'][normalize-space()='Cancel']`);
  }
  public get enterDateErrorMessage() {
    return $(`tr[class='crm-relationship-form-block-start_date'] span[class='crm-error']`);
  }
  public get pageTitle() {
    return $(`//input[@id='description']`);
  }
  public get relationshipTypeDropdownList() {
    return $("//select[@id='relationship_type_id']");
  }
  public get relTypeSelect() {
    return $(`//div[@id='s2id_relationship_type_id']`);
  }
  public get relTypeChildOf() {
    return $(`//div[text()='Child of']`);
  }
  public get relTypeHouseholdMemberIs() {
    return $(`//div[text()='Household Member is']`);
  }
  public get relTypeEmployerOf() {
    return $(`//div[text()='Employer of']`);
  }
  public get contactsSearchField() {
    return $(`//*[@id="s2id_autogen2"]`);
  }
  public get contactB() {
    return $(`(//div[@class='crm-select2-row'])[1]`);
  }
  public get startDateField() {
    return $(`//input[@class='crm-form-text crm-form-date hasDatepicker crm-placeholder-icon' and @aria-label='Start Date']`);
  }
  public get endDateField() {
    return $(`//input[@class='crm-form-text crm-form-date hasDatepicker crm-placeholder-icon' and @aria-label='End Date']`);
  }
  public get linkedInField() {
    return $(`//input[await (await this.pageTitle).click();@id='custom_54_-1']`);
  }
  public get websiteField() {
    return $(`//input[@id='custom_55_-1']`);
  }
  public get attachmentButton() {
    return $(`//input[@id='custom_53_-1']`);
  }
  public get saveRelationshipButton() {
    return $(`button[data-identifier='_qf_Relationship_upload']`);
  }
  public async searchForContacts(name: string) {
    await (await this.contactsSearchField).setValue(name);
  }
  /**
   * Method to get all options from the dropdown
   * @returns Array of option elements
   */
  public async getAllOptions(): Promise<string[]> {
    await (await this.relationshipTypeDropdownList).waitForDisplayed();
    return await browser.execute(() => {
      const options = document.querySelectorAll("#relationship_type_id option");
      return Array.from(options).map((option) => option.textContent.trim());
    });
  }

  /**
   * Method to select a specific option from the dropdown by visible text
   * @param optionText - The visible text of the option to select
   */
  public async selectOptionByText(optionText: string): Promise<void> {
    const options = await this.getAllOptions();
    for (const text of options) {
      if (text === optionText) {
        await $(`//select[@id='relationship_type_id']/option[text()='${optionText}']`).click();
        return;
      }
    }
    throw new Error(`Option "${optionText}" not found in the dropdown.`);
  }
  public async setDates(startdate: string | null, enddate: string | null): Promise<void> {
    if (startdate !== null) {
      await (await this.startDateField).setValue(startdate);
    } else {
      await (await this.startDateField).clearValue();
    }

    if (enddate !== null) {
      await (await this.endDateField).setValue(enddate);
    } else {
      await (await this.endDateField).clearValue();
    }
  }

  public async createNewRelationship(name: string, type: string, startdate: string, enddate: string) {
    await (await contactPage.relationshipsLink).click();
    await (await contactPage.addRelationshipButton).click();
    await (await this.relTypeSelect).click();

    switch (type) {
      case "Child of":
        await this.relTypeChildOf.click();
        break;
      case "Household Member is":
        await this.relTypeHouseholdMemberIs.click();
        break;
      case "Employer of":
        await this.relTypeEmployerOf.click();
        break;
      // Add other cases as needed
    }

    await this.contactsSearchField.click();
    await this.contactsSearchField.setValue(name);
    await browser.keys("Enter");
    await this.contactB.click();
    await this.setDates(startdate, enddate);
    await (await this.saveRelationshipButton).click();
  }
}

export default new AddRelationshipPage();
