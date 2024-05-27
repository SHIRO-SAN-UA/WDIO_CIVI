import allureReporter from "@wdio/allure-reporter";
import searchPage from "../pageobjects/search.page";
import contactPage from "../pageobjects/contact.page";
import homePage from "../pageobjects/home.page";
import addRelationshipPage from "../pageobjects/add.relationship.page";

describe("Individual to Individual Relationships", () => {
  const contactAName = "Doe, John";
  const contactBName = "Doe, Jane";
  afterEach(async () => {
    allureReporter.addStep("Delete created relationship");
    await contactPage.deleteCreatedRelationship();
  });
  it("TC01-II should Verify Current Relationship with Null Start and End Date", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Child of", null, null);

    allureReporter.addStep("Refresh page and navigate to Relationships");
    await browser.refresh();
    await (await contactPage.relationshipsLink).click();

    allureReporter.addStep("Check presence of new relationship in either Current or Inactive tables");
    const tableElement = await contactPage.isElementPartOfSpecificTable(await contactPage.individualContactEntry);

    allureReporter.addStep("Assert the table where the relationship is present");
    expect(tableElement).toBe("current");
  });
  it("TC02-II should Verify Current Relationship with Start Date in the past and End Date in the future", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Child of", "01/01/2020", "01/01/2030");

    allureReporter.addStep("Refresh page and navigate to Relationships");
    await browser.refresh();
    await (await contactPage.relationshipsLink).click();

    allureReporter.addStep("Check presence of new relationship in either Current or Inactive tables");
    const tableElement = await contactPage.isElementPartOfSpecificTable(await contactPage.individualContactEntry);

    allureReporter.addStep("Assert the table where the relationship is present");
    expect(tableElement).toBe("current");
  });
  it("TC03-II should Verify Current Relationship with Null Start Date and End Date in the future", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Child of", null, "01/01/2030");

    allureReporter.addStep("Refresh page and navigate to Relationships");
    await browser.refresh();
    await (await contactPage.relationshipsLink).click();

    allureReporter.addStep("Check presence of new relationship in either Current or Inactive tables");
    const tableElement = await contactPage.isElementPartOfSpecificTable(await contactPage.individualContactEntry);

    allureReporter.addStep("Assert the table where the relationship is present");
    expect(tableElement).toBe("current");
  });
  it("TC04-II should Verify Current Relationship with Start Date in the past and Null End Date", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Child of", "01/01/2020", null);

    allureReporter.addStep("Refresh page and navigate to Relationships");
    await browser.refresh();
    await (await contactPage.relationshipsLink).click();

    allureReporter.addStep("Check presence of new relationship in either Current or Inactive tables");
    const tableElement = await contactPage.isElementPartOfSpecificTable(await contactPage.individualContactEntry);

    allureReporter.addStep("Assert the table where the relationship is present");
    expect(tableElement).toBe("current");
  });
  it("TC05-II should Verify Inactive Relationship with Start Date in the future and Null End Date", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Child of", "01/01/2030", null);

    allureReporter.addStep("Refresh page and navigate to Relationships");
    await browser.refresh();
    await (await contactPage.relationshipsLink).click();

    allureReporter.addStep("Check presence of new relationship in either Current or Inactive tables");
    const tableElement = await contactPage.isElementPartOfSpecificTable(await contactPage.individualContactEntry);

    allureReporter.addStep("Assert the table where the relationship is present");
    expect(tableElement).toBe("inactive");
  });
  it("TC06-II should Verify Inactive Relationship with Start Date in the future and End Date in the future", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Child of", "01/01/2030", "01/01/2040");

    allureReporter.addStep("Refresh page and navigate to Relationships");
    await browser.refresh();
    await (await contactPage.relationshipsLink).click();

    allureReporter.addStep("Check presence of new relationship in either Current or Inactive tables");
    const tableElement = await contactPage.isElementPartOfSpecificTable(await contactPage.individualContactEntry);

    allureReporter.addStep("Assert the table where the relationship is present");
    expect(tableElement).toBe("inactive");
  });
  it("TC07-II should Verify Inactive Relationship with Null Start Date and End Date in the past", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Child of", null, "01/01/2020");

    allureReporter.addStep("Refresh page and navigate to Relationships");
    await browser.refresh();
    await (await contactPage.relationshipsLink).click();

    allureReporter.addStep("Check presence of new relationship in either Current or Inactive tables");
    const tableElement = await contactPage.isElementPartOfSpecificTable(await contactPage.individualContactEntry);

    allureReporter.addStep("Assert the table where the relationship is present");
    expect(tableElement).toBe("inactive");
  });
  it("TC08-II should Verify Inactive Relationship with Start Date in the past and End Date in the past", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Child of", "01/01/2010", "01/01/2020");

    allureReporter.addStep("Refresh page and navigate to Relationships");
    await browser.refresh();
    await (await contactPage.relationshipsLink).click();

    allureReporter.addStep("Check presence of new relationship in either Current or Inactive tables");
    const tableElement = await contactPage.isElementPartOfSpecificTable(await contactPage.individualContactEntry);

    allureReporter.addStep("Assert the table where the relationship is present");
    expect(tableElement).toBe("inactive");
  });
  it("TC09-II should Verify Incorrect Relationship Start and End Date input", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Child of", "01/01/2020", "01/01/2010");

    allureReporter.addStep("Assert the error message is displayed");
    await expect(await addRelationshipPage.enterDateErrorMessage).toHaveText("The relationship end date cannot be prior to the start date.");
    await addRelationshipPage.cancelButton.click();
  });
});
describe("Household to Individual Relationships", () => {
  const contactAName = "The Smith Family";
  const contactBName = "Doe, Jane";
  afterEach(async () => {
    allureReporter.addStep("Delete created relationship");
    await contactPage.deleteCreatedRelationship();
  });
  it("TC01-HI should Verify Current Relationship with Null Start and End Date", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Household Member is", null, null);

    allureReporter.addStep("Refresh page and navigate to Relationships");
    await browser.refresh();
    await (await contactPage.relationshipsLink).click();

    allureReporter.addStep("Check presence of new relationship in either Current or Inactive tables");
    const tableElement = await contactPage.isElementPartOfSpecificTable(await contactPage.individualContactEntry);

    allureReporter.addStep("Assert the table where the relationship is present");
    expect(tableElement).toBe("current");
  });
  it("TC02-HI should Verify Current Relationship with Start Date in the past and End Date in the future", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Household Member is", "01/01/2020", "01/01/2030");

    allureReporter.addStep("Refresh page and navigate to Relationships");
    await browser.refresh();
    await (await contactPage.relationshipsLink).click();

    allureReporter.addStep("Check presence of new relationship in either Current or Inactive tables");
    const tableElement = await contactPage.isElementPartOfSpecificTable(await contactPage.individualContactEntry);

    allureReporter.addStep("Assert the table where the relationship is present");
    expect(tableElement).toBe("current");
  });
  it("TC03-HI should Verify Current Relationship with Null Start Date and End Date in the future", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Household Member is", null, "01/01/2030");

    allureReporter.addStep("Refresh page and navigate to Relationships");
    await browser.refresh();
    await (await contactPage.relationshipsLink).click();

    allureReporter.addStep("Check presence of new relationship in either Current or Inactive tables");
    const tableElement = await contactPage.isElementPartOfSpecificTable(await contactPage.individualContactEntry);

    allureReporter.addStep("Assert the table where the relationship is present");
    expect(tableElement).toBe("current");
  });
  it("TC04-HI should Verify Current Relationship with Start Date in the past and Null End Date", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Household Member is", "01/01/2020", null);

    allureReporter.addStep("Refresh page and navigate to Relationships");
    await browser.refresh();
    await (await contactPage.relationshipsLink).click();

    allureReporter.addStep("Check presence of new relationship in either Current or Inactive tables");
    const tableElement = await contactPage.isElementPartOfSpecificTable(await contactPage.individualContactEntry);

    allureReporter.addStep("Assert the table where the relationship is present");
    expect(tableElement).toBe("current");
  });
  it("TC05-HI should Verify Inactive Relationship with Start Date in the future and Null End Date", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Household Member is", "01/01/2030", null);

    allureReporter.addStep("Refresh page and navigate to Relationships");
    await browser.refresh();
    await (await contactPage.relationshipsLink).click();

    allureReporter.addStep("Check presence of new relationship in either Current or Inactive tables");
    const tableElement = await contactPage.isElementPartOfSpecificTable(await contactPage.individualContactEntry);

    allureReporter.addStep("Assert the table where the relationship is present");
    expect(tableElement).toBe("inactive");
  });
  it("TC06-HI should Verify Inactive Relationship with Start Date in the future and End Date in the future", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Household Member is", "01/01/2030", "01/01/2040");

    allureReporter.addStep("Refresh page and navigate to Relationships");
    await browser.refresh();
    await (await contactPage.relationshipsLink).click();

    allureReporter.addStep("Check presence of new relationship in either Current or Inactive tables");
    const tableElement = await contactPage.isElementPartOfSpecificTable(await contactPage.individualContactEntry);

    allureReporter.addStep("Assert the table where the relationship is present");
    expect(tableElement).toBe("inactive");
  });
  it("TC07-HI should Verify Inactive Relationship with Null Start Date and End Date in the past", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Household Member is", null, "01/01/2020");

    allureReporter.addStep("Refresh page and navigate to Relationships");
    await browser.refresh();
    await (await contactPage.relationshipsLink).click();

    allureReporter.addStep("Check presence of new relationship in either Current or Inactive tables");
    const tableElement = await contactPage.isElementPartOfSpecificTable(await contactPage.individualContactEntry);

    allureReporter.addStep("Assert the table where the relationship is present");
    expect(tableElement).toBe("inactive");
  });
  it("TC08-HI should Verify Inactive Relationship with Start Date in the past and End Date in the past", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Household Member is", "01/01/2010", "01/01/2020");

    allureReporter.addStep("Refresh page and navigate to Relationships");
    await browser.refresh();
    await (await contactPage.relationshipsLink).click();

    allureReporter.addStep("Check presence of new relationship in either Current or Inactive tables");
    const tableElement = await contactPage.isElementPartOfSpecificTable(await contactPage.individualContactEntry);

    allureReporter.addStep("Assert the table where the relationship is present");
    expect(tableElement).toBe("inactive");
  });
  it("TC09-HI should Verify Incorrect Relationship Start and End Date input", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Household Member is", "01/01/2020", "01/01/2010");

    allureReporter.addStep("Assert the error message is displayed");
    await expect(await addRelationshipPage.enterDateErrorMessage).toHaveText("The relationship end date cannot be prior to the start date.");
    await addRelationshipPage.cancelButton.click();
  });
});
describe("Organization to Individual Relationships", () => {
  const contactAName = "ABC Corp";
  const contactBName = "Doe, Jane";
  afterEach(async () => {
    allureReporter.addStep("Delete created relationship");
    await contactPage.deleteCreatedRelationship();
  });
  it("TC01-OI should Verify Current Relationship with Null Start and End Date", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Employer of", null, null);

    allureReporter.addStep("Refresh page and navigate to Relationships");
    await browser.refresh();
    await (await contactPage.relationshipsLink).click();

    allureReporter.addStep("Check presence of new relationship in either Current or Inactive tables");
    const tableElement = await contactPage.isElementPartOfSpecificTable(await contactPage.individualContactEntry);

    allureReporter.addStep("Assert the table where the relationship is present");
    expect(tableElement).toBe("current");
  });
  it("TC02-OI should Verify Current Relationship with Start Date in the past and End Date in the future", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Employer of", "01/01/2020", "01/01/2030");

    allureReporter.addStep("Refresh page and navigate to Relationships");
    await browser.refresh();
    await (await contactPage.relationshipsLink).click();

    allureReporter.addStep("Check presence of new relationship in either Current or Inactive tables");
    const tableElement = await contactPage.isElementPartOfSpecificTable(await contactPage.individualContactEntry);

    allureReporter.addStep("Assert the table where the relationship is present");
    expect(tableElement).toBe("current");
  });
  it("TC03-OI should Verify Current Relationship with Null Start Date and End Date in the future", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Employer of", null, "01/01/2030");

    allureReporter.addStep("Refresh page and navigate to Relationships");
    await browser.refresh();
    await (await contactPage.relationshipsLink).click();

    allureReporter.addStep("Check presence of new relationship in either Current or Inactive tables");
    const tableElement = await contactPage.isElementPartOfSpecificTable(await contactPage.individualContactEntry);

    allureReporter.addStep("Assert the table where the relationship is present");
    expect(tableElement).toBe("current");
  });
  it("TC04-OI should Verify Current Relationship with Start Date in the past and Null End Date", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Employer of", "01/01/2020", null);

    allureReporter.addStep("Refresh page and navigate to Relationships");
    await browser.refresh();
    await (await contactPage.relationshipsLink).click();

    allureReporter.addStep("Check presence of new relationship in either Current or Inactive tables");
    const tableElement = await contactPage.isElementPartOfSpecificTable(await contactPage.individualContactEntry);

    allureReporter.addStep("Assert the table where the relationship is present");
    expect(tableElement).toBe("current");
  });
  it("TC05-OI should Verify Inactive Relationship with Start Date in the future and Null End Date", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Employer of", "01/01/2030", null);

    allureReporter.addStep("Refresh page and navigate to Relationships");
    await browser.refresh();
    await (await contactPage.relationshipsLink).click();

    allureReporter.addStep("Check presence of new relationship in either Current or Inactive tables");
    const tableElement = await contactPage.isElementPartOfSpecificTable(await contactPage.individualContactEntry);

    allureReporter.addStep("Assert the table where the relationship is present");
    expect(tableElement).toBe("inactive");
  });
  it("TC06-OI should Verify Inactive Relationship with Start Date in the future and End Date in the future", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Employer of", "01/01/2030", "01/01/2040");

    allureReporter.addStep("Refresh page and navigate to Relationships");
    await browser.refresh();
    await (await contactPage.relationshipsLink).click();

    allureReporter.addStep("Check presence of new relationship in either Current or Inactive tables");
    const tableElement = await contactPage.isElementPartOfSpecificTable(await contactPage.individualContactEntry);

    allureReporter.addStep("Assert the table where the relationship is present");
    expect(tableElement).toBe("inactive");
  });
  it("TC07-OI should Verify Inactive Relationship with Null Start Date and End Date in the past", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Employer of", null, "01/01/2020");

    allureReporter.addStep("Refresh page and navigate to Relationships");
    await browser.refresh();
    await (await contactPage.relationshipsLink).click();

    allureReporter.addStep("Check presence of new relationship in either Current or Inactive tables");
    const tableElement = await contactPage.isElementPartOfSpecificTable(await contactPage.individualContactEntry);

    allureReporter.addStep("Assert the table where the relationship is present");
    expect(tableElement).toBe("inactive");
  });
  it("TC08-OI should Verify Inactive Relationship with Start Date in the past and End Date in the past", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Employer of", "01/01/2010", "01/01/2020");

    allureReporter.addStep("Refresh page and navigate to Relationships");
    await browser.refresh();
    await (await contactPage.relationshipsLink).click();

    allureReporter.addStep("Check presence of new relationship in either Current or Inactive tables");
    const tableElement = await contactPage.isElementPartOfSpecificTable(await contactPage.individualContactEntry);

    allureReporter.addStep("Assert the table where the relationship is present");
    expect(tableElement).toBe("inactive");
  });
  it("TC09-OI should Verify Incorrect Relationship Start and End Date input", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Employer of", "01/01/2020", "01/01/2010");

    allureReporter.addStep("Assert the error message is displayed");
    await expect(await addRelationshipPage.enterDateErrorMessage).toHaveText("The relationship end date cannot be prior to the start date.");
    await addRelationshipPage.cancelButton.click();
  });
});
