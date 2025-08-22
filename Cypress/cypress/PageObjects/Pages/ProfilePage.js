class ProfilePage {
  elements = {
    myInfoTab: () => cy.contains("span.oxd-main-menu-item--name", "My Info"),
    qualificationTab: () =>
      cy.contains("a.orangehrm-tabs-item", "Qualification"),
    addWorkExp: () =>
      cy
        .get("button.oxd-button.oxd-button--medium.oxd-button--text")
        .eq(0)
        .contains("Add"),
    companyInput: () =>
      cy
        .get("label")
        .contains("Company")
        .parents(".oxd-input-group")
        .find("input"),
    jobTitleInput: () =>
      cy
        .get("label")
        .contains("Job Title")
        .parents(".oxd-input-group")
        .find("input"),
    fromDateInput: () =>
      cy
        .get("label")
        .contains("From")
        .parents(".oxd-input-group")
        .find("input"),
    toDateInput: () =>
      cy.get("label").contains("To").parents(".oxd-input-group").find("input"),
    commentTextarea: () =>
      cy
        .get("label")
        .contains("Comment")
        .parents(".oxd-input-group")
        .find("textarea"),
    workExpSave: () =>
      cy.get(
        "button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space"
      ),
    editRecordButton: () => cy.get("i.oxd-icon.bi-pencil-fill").eq(0),
    confirmDeleteButton: () =>
      cy
        .get(
          "button.oxd-button.oxd-button--medium.oxd-button--label-danger.orangehrm-button-margin"
        )
        .should("be.visible"),
    multipleSelector: () =>
      cy.get("i.oxd-icon.bi-check.oxd-checkbox-input-icon"),
    multipleDeleteButton: () =>
      cy.get(
        "button.oxd-button.oxd-button--medium.oxd-button--label-danger.orangehrm-horizontal-margin"
      ),
    addEduButton: () =>
      cy
        .contains("h6", "Education")
        .parents("[class*=orangehrm-action-header]")
        .find("button"),
    levelDropdown: () =>
      cy
        .get("label")
        .contains("Level")
        .parents(".oxd-input-group")
        .find(".oxd-select-wrapper"),
    instituteInput: () =>
      cy
        .get("label")
        .contains("Institute")
        .parents(".oxd-input-group")
        .find("input"),
    yearInput: () =>
      cy
        .get("label")
        .contains("Year")
        .parents(".oxd-input-group")
        .find("input"),
    gpaInput: () =>
      cy
        .get("label")
        .contains("GPA/Score")
        .parents(".oxd-input-group")
        .find("input"),
    firstRow: () =>
      cy.get(".orangehrm-container").eq(1).find(".oxd-table-card").eq(0),
    addLanguageButton: () =>
      cy
        .contains("h6", "Languages")
        .parents("[class*=orangehrm-action-header]")
        .find("button"),
    languageDropdown: () =>
      cy
        .get("label")
        .contains("Language")
        .parents(".oxd-grid-item")
        .find(".oxd-select-text"),
    fluencyDropdown: () =>
      cy
        .get("label")
        .contains("Fluency")
        .parents(".oxd-grid-item")
        .find(".oxd-select-text"),
    competencyDropdown: () =>
      cy
        .get("label")
        .contains("Competency")
        .parents(".oxd-grid-item")
        .find(".oxd-select-text"),
    languageComment: () =>
      cy
        .get("label")
        .contains("Comments")
        .parentsUntil(".oxd-form-row")
        .parent()
        .find("textarea"),

    saveLanguageButton: () =>
      cy.get(
        "button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space"
      ),
    addSkillButton: () =>
      cy
        .contains("h6", "Skills")
        .parents("[class*=orangehrm-action-header]")
        .find("button"),
    skillDropdown: () =>
      cy
        .get("label")
        .contains("Skill")
        .parents(".oxd-input-group")
        .find(".oxd-select-text"),
    skillOption: (skillName) =>
      cy.get(".oxd-select-dropdown").contains(skillName),
    yearsOfExperienceInput: () =>
      cy
        .get("label")
        .contains("Years of Experience")
        .parents(".oxd-input-group")
        .find("input"),
    skillSaveButton: () =>
      cy.get(
        "button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space"
      ),
    firstRowOfSkills: () =>
      cy.get(".orangehrm-container").eq(2).find(".oxd-table-card").eq(0),
  };

  /**
   * Adds a qualification record for the user.
   *
   * Fills company and job title, saves the entry, and returns the updated list.
   *
   * @param compInput - Company name
   * @param jobTitle - Job title
   * @returns List of qualification entries
   */
  addQualificationRecord(comment) {
    this.elements.myInfoTab().click();
    cy.wait(2000);

    this.elements.qualificationTab().click();
    cy.wait(2000);

    this.elements.addWorkExp().click();
    cy.wait(2000);

    cy.fixture("WorkExpData").then((data) => {
      this.elements.companyInput().type(data.company);
      this.elements.jobTitleInput().type(data.jobTitle);
      this.elements.fromDateInput().type(data.fromDate);
      this.elements.commentTextarea().type(comment);

      this.elements.workExpSave().click();
    });
    cy.wait(2000);
  }

  /**
   * Adds and deletes a qualification entry.
   *
   * Adds a qualification with the provided company name, deletes it, and returns the updated list.
   *
   * @param delUser - Company name to be added and then deleted
   * @param jobTitle - Job title associated with the qualification
   * @returns List of remaining qualification entries
   */
  deleteQualificationRecord(comment) {
    this.elements.myInfoTab().click();
    cy.wait(2000);
    this.elements.qualificationTab().click();
    cy.wait(2000);
    this.elements.addWorkExp().click();
    cy.wait(2000);
    cy.fixture("DeleteWorkExp").then((data) => {
      this.elements.companyInput().type(data.company);
      this.elements.jobTitleInput().type(data.jobTitle);
      this.elements.fromDateInput().type(data.fromDate);
      this.elements.commentTextarea().type(comment);
      this.elements.workExpSave().click();
    });
    cy.wait(1000);
    cy.contains(comment).should("be.visible");
    cy.contains(".oxd-table-cell", comment)
      .parents(".oxd-table-row")
      .find("i.oxd-icon.bi-trash")
      .click();

    this.elements.confirmDeleteButton().click();
    cy.wait(1000);
  }

  /**
   * Deletes multiple selected qualification entries.
   *
   * Selects specific checkboxes, deletes the entries, and returns the toast confirmation message.
   *
   * @returns Success message text after deletion
   */
  deleteMultipleRecords() {
    this.elements.myInfoTab().click();
    cy.wait(1000);

    this.elements.qualificationTab().click();
    cy.wait(3000);
    this.elements.multipleSelector().eq(1).click();
    this.elements.multipleSelector().eq(1).click();
    this.elements.multipleSelector().eq(1).click();
    this.elements.multipleDeleteButton().click();
    this.elements.confirmDeleteButton().click();
  }

  /**
   * Edits an existing qualification entry.
   *
   * Updates the company name and returns the updated list.
   *
   * @param editInput - Updated company name
   * @returns List of qualification entries
   */
  addEducationRecord(uniqueGpa, randomYear) {
    this.elements.myInfoTab().click();
    cy.wait(1000);

    this.elements.qualificationTab().click();
    cy.wait(2000);

    this.elements.addEduButton().click();
    cy.fixture("EduRecordData").then((data) => {
      this.elements.levelDropdown().click();
      cy.get(".oxd-select-dropdown").contains(data.level1).click();

      this.elements.instituteInput().type(data.institute);
      this.elements.yearInput().type(randomYear);
      this.elements.gpaInput().type(uniqueGpa);
      this.elements.workExpSave().click();
    });
    cy.wait(1000);
  }

  /**
   * Adds a new education entry with the given GPA to the user's qualifications.
   *
   * Selects an education level, inputs GPA, and saves the entry.
   *
   * @param GPA - The GPA value to be added.
   * @returns A list of all GPA entries after addition.
   */
  editEducationRecord(uniqueGpa, randomYear) {
    this.elements.myInfoTab().click();
    cy.wait(2000);

    this.elements.qualificationTab().click();
    cy.wait(2000);
    this.elements.firstRow().find("i.oxd-icon.bi-pencil-fill").click();
    this.elements.gpaInput().clear().type(uniqueGpa);
    this.elements.yearInput().clear().type(randomYear);

    this.elements.workExpSave().click();
    cy.wait(1000);
  }

  /**
   * Adds a skill with a given year, deletes it, and returns the updated skills list.
   * @param year - The unique year value to identify the skill.
   * @returns The updated list of skills after deletion.
   */
  deleteSkillsRecord(year) {
    cy.contains("span.oxd-main-menu-item--name", "My Info").click();
    cy.wait(2000);
    cy.contains("a.orangehrm-tabs-item", "Qualification").click();
    cy.wait(2000);
    cy.contains("h6", "Skills")
      .parents("[class*=orangehrm-action-header]")
      .find("button")
      .click();
    cy.wait(2000);
    cy.get("label")
      .contains("Skill")
      .parents(".oxd-input-group")
      .find(".oxd-select-text")
      .click();
    cy.get(".oxd-select-dropdown > div").eq(1).click();
    cy.get("label")
      .contains("Years of Experience")
      .parents(".oxd-input-group")
      .find("input")
      .type(year.toString());
    cy.get(
      "button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space"
    ).click();
    cy.wait(5000);
    cy.get(".oxd-table-row")
      .filter((index, el) => {
        return (
          Cypress.$(el).find(".oxd-table-cell").eq(2).text().trim() ===
          year.toString()
        );
      })
      .find("i.oxd-icon.bi-trash")
      .click();
    cy.get(
      "button.oxd-button.oxd-button--medium.oxd-button--label-danger.orangehrm-button-margin"
    )
      .should("be.visible")
      .click();
    cy.wait(1000);
    cy.get(".orangehrm-container").eq(2).should("be.visible");
  }

  /**
   * Adds a skill with a given year, selects it using its checkbox,
   * deletes it via "Delete Selected" option, and returns the updated skills list.
   * @param year - The unique year value to identify the skill.
   * @returns The updated list of skills after deletion.
   */
  selectDeleteSkills() {
    cy.contains("span.oxd-main-menu-item--name", "My Info").click();
    cy.wait(3000);
    cy.contains("a.orangehrm-tabs-item", "Qualification").click();
    cy.wait(5000);
    cy.xpath(
      "((//h6[normalize-space()='Skills']/../../..//div[@role='row'])[2]//i)[1]"
    ).click();
    cy.xpath(
      "((//h6[normalize-space()='Skills']/../../..//div[@role='row'])[2]//i)[2]"
    ).click();
    cy.get(
      "button.oxd-button.oxd-button--medium.oxd-button--label-danger.orangehrm-button-margin"
    )
      .should("be.visible")
      .click();
    cy.wait(2000);
    cy.get(".orangehrm-container").eq(2).should("be.visible");
  }
}

export default ProfilePage;
