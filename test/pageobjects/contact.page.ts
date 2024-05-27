import Page from "./page";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ContactPage extends Page {
  public get deleteInactiveRelationshipOption() {
    return $(`//tr[.//a[contains(text(), 'Doe, Jane')]]//a[contains(@title, 'Delete')]`);
  }
  public get deleteRelationshipButton() {
    return $(`//button[@type='button'][normalize-space()='Delete']`);
  }
  public get deleteCurrentRelationshipOption() {
    return $(`//span[@class='btn-slide crm-hover-button btn-slide-active']//a[@title='Delete Relationship'][normalize-space()='Delete']`);
  }
  public get individualMoreCurrentRelationshipActionsButton() {
    return $(`//tr[.//a[normalize-space()='Doe, Jane']]//span[@class='btn-slide crm-hover-button']`);
  }
  public get relationshipsLink() {
    return $(`a[title='Relationships'] span`);
  }
  public get addRelationshipButton() {
    return $(`//span[normalize-space()='Add Relationship']`);
  }
  public get currentRelationshipsTable() {
    return $(`//table[@id='DataTables_Table_0']`);
  }
  public get inactiveRelationshipsTable() {
    return $(`//table[@id='DataTables_Table_1']`);
  }
  public get individualContactEntry() {
    return $(`.//a[normalize-space()='Doe, Jane']`);
  }
  public get householdContactEntry() {
    return $(`.//a[normalize-space()='Doe, John']`);
  }
  public async isElementPartOfSpecificTable(element: WebdriverIO.Element): Promise<string> {
    const currentTable = this.currentRelationshipsTable;
    const inactiveTable = this.inactiveRelationshipsTable;

    // Wait for the tables to be displayed
    await currentTable.waitForDisplayed({ timeout: 5000 });
    await inactiveTable.waitForDisplayed({ timeout: 5000 });
    await element.waitForDisplayed({ timeout: 5000 });

    // Get the selector of the element
    const elementSelector = element.selector;

    // Check if the element is part of the current relationships table
    const isPartOfCurrent = await currentTable.$(elementSelector).isDisplayed();

    // Check if the element is part of the inactive relationships table
    const isPartOfInactive = await inactiveTable.$(elementSelector).isDisplayed();

    if (isPartOfCurrent && !isPartOfInactive) {
      return "current";
    } else if (!isPartOfCurrent && isPartOfInactive) {
      return "inactive";
    } else {
      return "none";
    }
  }

  public async deleteCreatedRelationship() {
    try {
      await this.individualMoreCurrentRelationshipActionsButton.click();
      await this.deleteCurrentRelationshipOption.click();
    } catch (error) {
      try {
        await this.deleteInactiveRelationshipOption.click();
      } catch (inactiveError) {
        console.log("No relationship found to delete.");
        return;
      }
    }
    await this.deleteRelationshipButton.click();
  }
}
export default new ContactPage();
