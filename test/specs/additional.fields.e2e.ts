import allureReporter from "@wdio/allure-reporter";
import searchPage from "../pageobjects/search.page";
import contactPage from "../pageobjects/contact.page";
import homePage from "../pageobjects/home.page";
import addRelationshipPage from "../pageobjects/add.relationship.page";

// WIP
describe("Additional Fields for 'Employee of / Employer of' Relationships", () => {
  const contactAName = "ABC Corp";
  const contactBName = "Doe, Jane";
  const validLinkedInURL = "https://www.linkedin.com/in/abc_corp";
  const invalidLinkedInURL = "invalid_link";
  const validWebsiteURL = "https://www.abccorp.com";
  const invalidWebsiteURL = "invalid_website";
  const filePath = "./Resume_compressed.pdf";
  afterEach(async () => {
    allureReporter.addStep("Delete created relationship");
    await contactPage.deleteCreatedRelationship();
  });
  it("TC01-AF should verify 'LinkedIn,' 'Website,' and 'Attachments' fields for 'Employee of' relationship", async () => {
    allureReporter.addStep("Search and select Contact A");
    await homePage.navigateToSearchPage();
    await searchPage.searchAndSelectContact(contactAName);

    allureReporter.addStep("Create new relationship with Contact B");
    await addRelationshipPage.createNewRelationship(contactBName, "Employer of", null, null);

    allureReporter.addStep("Verify 'LinkedIn,' 'Website,' and 'Attachments' fields are present");
    await expect(addRelationshipPage.linkedInField).toBeDisplayed();
    await expect(addRelationshipPage.websiteField).toBeDisplayed();
    await expect(addRelationshipPage.attachmentButton).toBeDisplayed();

    allureReporter.addStep("Enter an invalid LinkedIn URL and Website URL and verify the error message is displayed");
    await addRelationshipPage.setLinkedIn(invalidLinkedInURL);
    await addRelationshipPage.setWebsite(invalidWebsiteURL);
    await addRelationshipPage.saveRelationshipButton.click();
    // await expect(addRelationshipPage.invalidLinkedinUrlErrorMessage).toHaveText("Please enter a valid Linkedin URL.");
    await expect(addRelationshipPage.invalidWebsiteUrlErrorMessage).toHaveText("Please enter a valid URL.");
    await addRelationshipPage.linkedInField.clearValue();
    await addRelationshipPage.websiteField.clearValue();

    allureReporter.addStep("Enter a valid Website URL and save the relationship");
    await addRelationshipPage.setWebsite(validWebsiteURL);

    allureReporter.addStep("Enter a valid LinkedIn URL and save the relationship");
    await addRelationshipPage.setLinkedIn(validLinkedInURL);
    await addRelationshipPage.saveRelationshipButton.click();

    // allureReporter.addStep("Upload a valid file in the 'Attachments' field and save the relationship");
    // await addRelationshipPage.uploadAttachment(filePath);
    // await addRelationshipPage.saveRelationshipButton.click();
  });
});
