class ClaimPage {
  elements = {
    claimButton: () => cy.xpath('//span[text()="Claim"]'),
    configurationTab: () => cy.xpath('//span[text()="Configuration "]'),
    eventTab: () => cy.xpath('//a[text()="Events"]'),
    addBtn: () => cy.xpath('//button[text()=" Add "]'),
    eventInput: () => cy.xpath("//div/input").eq(1),
    saveBtn: () => cy.xpath('//button[text()=" Save "]'),
    confirmDel: () => cy.xpath('//button[text()=" Yes, Delete "]'),
    deleteToggle: (eventName) =>
      cy.xpath(
        `//div[contains(@class, 'oxd-table-card') and contains(., '${eventName}')]//i[contains(@class, 'bi-trash')]`
      ),
    editToggle: (eventName) =>
      cy.xpath(
        `//div[contains(@class, 'oxd-table-card') and contains(., '${eventName}')]//i[contains(@class, 'bi-pencil-fill')]`
      ),
    eventRow: (eventName) =>
      cy.xpath(`//div[@role='row']/div[2]/div[text()='${eventName}']`),
    statusText: (eventName) =>
      cy.xpath(
        `//div[contains(@class, 'oxd-table-card') and contains(., '${eventName}')]/div/div[3]`
      ),
    activeButton: () =>
      cy.xpath(
        "//span[@class='oxd-switch-input oxd-switch-input--active --label-right']"
      ),
  };

  /**
   * Navigates to the Claim configuration page and opens the Event tab.
   *
   * Steps performed:
   * - Clicks on the Claim menu.
   * - Opens the Configuration sub-tab.
   * - Selects the Event tab.
   * - Waits for the page to load.
   *
   * @returns {Promise<string>} The current page URL after navigating to the Event tab.
   */
  clickClaimButton() {
    this.elements.claimButton().click();
    cy.wait(2000);
    this.elements.configurationTab().click();
    cy.wait(2000);
    this.elements.eventTab().click();
    cy.wait(3000);
    return cy.url();
  }

  /**
   * Adds a new event in Claim > Configuration > Event tab.
   * @param eventName - The name of the event to be created.
   * @returns A list of all event names after creation.
   */
  addEvent(eventName) {
    this.elements.addBtn().click();
    this.elements.eventInput().type(eventName);
    this.elements.saveBtn().click();
    cy.wait(3000);
  }

  /**
   * Creates an event, deletes it, and returns the updated event list.
   * @param editEventName - Name of the event to add and delete.
   * @returns The list of remaining event names.
   */
  deleteEvent(eventName) {
    cy.wait(5000);
    cy.xpath("//input[@placeholder='Type for hints...']").type(eventName, {
      force: true,
    });
    cy.wait(2000);

    cy.get(
      "button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space"
    ).click();
    cy.wait(2000);

    cy.get("i.oxd-icon.bi-trash").click({ force: true });
    cy.wait(1000);
    this.elements.confirmDel().click();
    cy.wait(1000);
  }

  editEvent(eventName, newName) {
    cy.xpath("//input[@placeholder='Type for hints...']").type(eventName, {
      force: true,
    });
    cy.wait(2000);

    cy.get(
      "button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space"
    ).click();
    cy.wait(2000);

    cy.get("i.oxd-icon.bi-pencil-fill").click({ force: true });
    cy.wait(1000);
    this.elements.eventInput().clear().type(newName);
    this.elements.activeButton().click();
    this.elements.saveBtn().click();
    cy.wait(3000);
  }

  /**
   * Creates an event, marks it inactive, and returns its status text.
   * @param togEventName - Name of the event to create and inactivate.
   * @returns The status text of the event after inactivation.
   */
  getEventStatus(newName) {
    cy.xpath("//input[@placeholder='Type for hints...']").type(newName, {
      force: true,
    });
    cy.wait(2000);

    cy.get(
      "button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space"
    ).click();
    cy.wait(2000);
    return this.elements.statusText(newName).invoke("text");
  }

  /**
   * Adds a new expense type in Claim > Configuration > Expense Types
   * and returns the updated expense type list.
   * @param expenseName - The unique name for the new expense type.
   * @returns The updated list of expense types.
   */
  addExpense(expenseName) {
    this.elements.claimButton().click();
    cy.wait(1000);
    this.elements.configurationTab().click();
    cy.wait(1000);
    cy.xpath("//a[text()='Expense Types']").click();
    cy.wait(1000);
    this.elements.addBtn().click();
    cy.wait(1000);
    this.elements.eventInput().type(expenseName);
    this.elements.saveBtn().click();
    cy.wait(1000);
    cy.contains(expenseName).should("be.visible");
  }

  /**
   * Edits an existing expense type in Claim > Configuration > Expense Types
   * and returns the updated expense type list.
   * @param updatedName - The updated name for the expense type.
   * @returns The updated list of expense types.
   */
  editExpense(oldExpenseName, newExpenseName) {
    this.elements.claimButton().click();
    cy.wait(2000);
    this.elements.configurationTab().click();
    cy.wait(2000);
    cy.xpath("//a[text()='Expense Types']").click();
    cy.wait(2000);
    this.elements.addBtn().click();
    cy.wait(2000);
    this.elements.eventInput().type(oldExpenseName);
    this.elements.saveBtn().click();
    cy.wait(2000);
    cy.xpath("//input[@placeholder='Type for hints...']").type(oldExpenseName, {
      force: true,
    });
    cy.wait(2000);
    cy.get(
      "button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space"
    ).click();
    cy.wait(2000);
    cy.get("i.oxd-icon.bi-pencil-fill").click({ force: true });
    cy.wait(1000);
    this.elements.eventInput().clear().type(newExpenseName);
    this.elements.activeButton().click();
    this.elements.saveBtn().click();
    cy.wait(3000);
    cy.contains(newExpenseName).should("be.visible");
  }

  /**
   * Deletes an existing expense type in Claim > Configuration > Expense Types
   * and returns the updated expense type list.
   * @param expenseName - The name of the expense type to delete.
   * @returns The updated list of expense types.
   */
  deleteExpense(expenseName) {
    this.elements.claimButton().click();
    cy.wait(1000);
    this.elements.configurationTab().click();
    cy.wait(1000);
    cy.xpath("//a[text()='Expense Types']").click();
    cy.wait(1000);
    this.elements.addBtn().click();
    cy.wait(1000);
    this.elements.eventInput().type(expenseName);
    this.elements.saveBtn().click();
    cy.wait(5000);
    cy.xpath("//input[@placeholder='Type for hints...']").type(expenseName, {
      force: true,
    });
    cy.wait(2000);
    cy.get(
      "button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space"
    ).click();
    cy.wait(2000);
    cy.get("i.oxd-icon.bi-trash").click({ force: true });
    cy.wait(1000);
    this.elements.confirmDel().click();
    cy.wait(1000);
    cy.contains(expenseName).should("not.exist");
  }

  /**
   * Deletes multiple expense types by selecting their checkboxes and confirming deletion.
   * @param expenseNames - Array of expense type names to delete.
   * @returns Updated expense type list after deletion.
   */
  multipleExpenseDel(expenseName) {
    this.elements.claimButton().click();
    cy.wait(1000);
    this.elements.configurationTab().click();
    cy.wait(1000);
    cy.xpath("//a[text()='Expense Types']").click();
    cy.wait(1000);
    this.elements.addBtn().click();
    cy.wait(1000);
    this.elements.eventInput().type(expenseName);
    this.elements.saveBtn().click();
    cy.wait(5000);
    cy.xpath("//input[@placeholder='Type for hints...']").type(expenseName, {
      force: true,
    });
    cy.wait(2000);

    cy.get(
      "button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space"
    ).click();
    cy.wait(2000);

    cy.get("i.oxd-icon.bi-trash").click({ force: true });
    cy.wait(1000);
    this.elements.confirmDel().click();
    cy.wait(1000);
    cy.contains(expenseName).should("not.exist");
  }
}

export default ClaimPage;
