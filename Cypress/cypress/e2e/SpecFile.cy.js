import LoginPage from "../PageObjects/Pages/LoginProfilePage";
import ProfilePage from "../PageObjects/Pages/ProfilePage";
import ClaimPage from "../PageObjects/Pages/ClaimPage";

describe("Automation Suite for Yaksha Application", () => {
  const loginPage = new LoginPage();
  const profilePage = new ProfilePage();
  const claimPage = new ClaimPage();

  beforeEach(() => {
    // Visit the Login Page before each test
    loginPage.performLogin();
  });

  /**
   * Test Case 1: Verify that a new Qualification can be added to a user's record
   *
   * Purpose:
   * Ensures that a user can successfully add a new qualification entry with specified company and job title.
   *
   * Steps:
   * 1. Generate a unique company name for input.
   * 2. Navigate to the "My Info" > Qualifications section.
   * 3. Fill out and submit the form with company and job title.
   * 4. Retrieve the list of qualification entries.
   * 5. Assert that the list contains the newly added company name.
   */
  it("TC-1: Verify New 'Qualification' could be added to the record of user", () => {
    const comment = "Comment_&" + Date.now();
    cy.wrap(null)
      .then(() => {
        profilePage.addQualificationRecord(comment);
      })
      .then(() => {
        verifyWorkExpAdded(comment);
      });
  });

  /**
   * Test Case-2: Verify New 'Qualification' added could be edited from the record of user
   *
   * Purpose:
   * Ensures that a qualification entry can be edited and the update is reflected in the list.
   *
   * Steps:
   * 1. Navigate to the qualification section.
   * 2. Edit the first entry with new company name.
   * 3. Verify the updated company name appears in the list.
   */
  it("TC-2: Verify New 'Qualification' added could be edited from the record of user", () => {
    const uniqueGpa = "gpa_&" + Date.now();
    const randomYear = Math.floor(Math.random() * (2025 - 1980 + 1)) + 1980;
    cy.wrap(null)
      .then(() => {
        profilePage.addEducationRecord(uniqueGpa, randomYear);
      })
      .then(() => {
        verifyEduRecordAdded(uniqueGpa);
      });
  });

  /**
   * Test Case-3: Verify the qualification could be deleted
   *
   * Purpose:
   * Validates that a qualification entry added to the user's record can be deleted successfully.
   *
   * Steps:
   * 1. Generate a unique company name for the qualification.
   * 2. Add the qualification using the generated company name and job title.
   * 3. Locate and trigger the delete action for the added qualification.
   * 4. Confirm the deletion.
   * 5. Retrieve the list of remaining qualifications.
   * 6. Assert that the deleted qualification no longer appears in the list.
   */
  it("TC-3: Verify the qualification could be deleted", () => {
    const comment = "Comment_&" + Date.now();
    cy.wrap(null)
      .then(() => {
        profilePage.deleteQualificationRecord(comment);
      })
      .then(() => {
        verifyWorkExpDelete(comment);
      });
  });

  /**
   * Test Case-4: Verify the qualification select delete functionality
   *
   * Purpose:
   * Ensures that multiple qualifications can be selected and deleted successfully.
   *
   * Steps:
   * 1. Navigate to the user's qualification section.
   * 2. Trigger selection of multiple qualifications using checkboxes.
   * 3. Initiate and confirm the delete action.
   * 4. Capture the toast message after deletion.
   * 5. Assert that the success message confirms the deletion.
   */
  it("TC-4: Verify the qualification select delete functionality", () => {
    cy.wrap(null)
      .then(() => {
        profilePage.deleteMultipleRecords();
      })
      .then(() => {
        verifyMultipleWorkExpDelete();
      });
  });

  /**
   * Test Case 5: Verify New 'Education' could be added to the record of user
   *
   * Purpose:
   * Validates that a user can successfully add a new education entry to their qualification record.
   *
   * Steps:
   * 1. Generate a unique GPA value.
   * 2. Navigate to the Education section and fill in required fields.
   * 3. Submit the education form.
   * 4. Capture the updated education list.
   * 5. Assert that the new GPA value appears in the list.
   */
  it("TC-5: Verify New 'Education' could be added to the record of user", () => {
    const uniqueGpa = "gpa_&" + Date.now();
    const randomYear = Math.floor(Math.random() * (2025 - 1980 + 1)) + 1980;
    cy.wrap(null)
      .then(() => {
        profilePage.editEducationRecord(uniqueGpa, randomYear);
      })
      .then(() => {
        verifyEduRecordEdit(uniqueGpa);
      });
  });

  /**
   * Test Case-6: Verify Event Tab URL in Claim Configuration
   *
   * Objective:
   * Ensure that navigating to the Claim > Configuration > Event tab
   * leads to the correct URL.
   *
   * Steps:
   * 1. Navigate to Claim > Configuration > Event.
   * 2. Capture the page URL after loading the Event tab.
   * 3. Assert that the URL contains the expected path.
   *
   * Expected:
   * The URL should contain "claim/viewEvents".
   */
  it("TC-6: Verify Event tab URL in Claim configuration", () => {
    cy.wrap(null).then(() => {
      claimPage.clickClaimButton().then((url) => {
        verifyEventTabUrl(url);
      });
    });
  });

  /**
   * Test Case-7: Verify Event creation in Claim configuration
   *
   * Objective:
   * Ensure that a new event can be created in Claim > Configuration > Event,
   * and that the created event appears in the list.
   *
   * Steps:
   * 1. Generate a unique event name.
   * 2. Add the event via Claim configuration.
   * 3. Verify the list contains the newly created event.
   *
   * Expected:
   * The event name should appear in the event list after creation.
   */
  it("TC-7: Verify Event creation in Claim configuration", () => {
    const eventName = `Event_${Math.floor(Math.random() * 1000)}`;
    cy.wrap(null)
      .then(() => {
        claimPage.clickClaimButton();
        claimPage.addEvent(eventName);
      })
      .then(() => {
        verifyEventCreated(eventName);
      });
  });

  /**
   * Test Case-8: Verify Event Deletion in Claim Configuration
   *
   * Objective:
   * Ensure that an event in Claim > Configuration > Event can be deleted
   * and that it no longer appears in the event list.
   *
   * Steps:
   * 1. Create an event with a unique name.
   * 2. Delete the created event.
   * 3. Verify that the event list is not empty and does not contain the deleted event.
   *
   * Expected:
   * The deleted event should no longer appear in the list.
   */
  it("TC-8: Verify Event Deletion in Claim Configuration", () => {
    const eventName = `EventD_${Math.floor(Math.random() * 1000)}`;
    cy.wrap(null)
      .then(() => {
        claimPage.clickClaimButton();
        claimPage.addEvent(eventName);
        claimPage.deleteEvent(eventName);
      })
      .then(() => {
        verifyEventDeleted(eventName);
      });
  });

  /**
   * Test Case-9: Event Inactive in Claim Configuration
   *
   * Objective:
   * Ensure that an event in Claim > Configuration > Event can be marked as inactive
   * and its status changes accordingly.
   *
   * Steps:
   * 1. Create an event with a unique name.
   * 2. Edit the event and disable the "Active" toggle.
   * 3. Save changes and verify the status is "Inactive".
   *
   * Expected:
   * The event status should display as "Inactive".
   */
  it("TC-9: Event Inactive in Claim Configuration", () => {
    const eventName = `Toggle_${Math.floor(Math.random() * 1000)}`;
    cy.wrap(null)
      .then(() => {
        claimPage.clickClaimButton();
        claimPage.addEvent(eventName);
        claimPage.editEvent(eventName, eventName);
      })
      .then(() => {
        claimPage.getEventStatus(eventName).then((status) => {
          verifyEventInactive(status);
        });
      });
  });

  /**
   * Test Case: TS-10 Verify that a new Expense Type can be added
   *
   * Objective:
   * Confirm that an expense type can be created under Claim > Configuration > Expense Types,
   * and that the newly added expense appears in the expense type list.
   *
   * Steps:
   * 1. Login with valid credentials.
   * 2. Navigate to Claim tab.
   * 3. Open Configuration sub-tab.
   * 4. Select Expense Types.
   * 5. Add a new expense type with a unique name.
   * 6. Verify the new expense type appears in the list.
   *
   * Expected:
   * The added expense type should be visible in the expense type list.
   */
  it("TC-10: Verify that a new Expense Type can be added", () => {
    const expenseName = `Expnse_${Math.floor(Math.random() * 1000)}`;
    cy.wrap(null)
      .then(() => {
        claimPage.clickClaimButton();
        claimPage.addExpense(expenseName);
      })
      .then(() => {
        verifyExpenseTypeAdded(expenseName);
      });
  });

  /**
   * Test Case: TS-11 Delete Skill from My Info
   *
   * Objective:
   * Verify that a skill can be added and then deleted from My Info > Qualifications > Skills,
   * and that it no longer appears in the list.
   *
   * Steps:
   * 1. Add a skill with a unique year value.
   * 2. Delete the added skill.
   * 3. Verify the list is not empty and does not contain the deleted year.
   *
   * Expected:
   * The deleted skill should no longer appear in the skills list.
   */
  it("TC-11: Verify the 'Skills' could be deleted from the record", () => {
    const year = Math.floor(Math.random() * 100) - 1;
    cy.wrap(null)
      .then(() => {
        profilePage.deleteSkillsRecord(year);
      })
      .then(() => {
        verifySkillDeleted(year);
      });
  });

  /**
   * Test Case: TS-12 Delete Skill using "Select and Delete" option
   *
   * Objective:
   * Verify that a skill can be added, selected via checkbox, and deleted from
   * My Info > Qualifications > Skills, ensuring it no longer appears in the list.
   *
   * Steps:
   * 1. Add a skill with a unique year value.
   * 2. Select the skill using its checkbox.
   * 3. Click "Delete Selected" and confirm deletion.
   * 4. Verify the deleted skill does not appear in the updated list.
   *
   * Expected:
   * The deleted skill should not be present in the skills list.
   */
  it("TC-12: Verify the 'Skills' could be selected delete functionality", () => {
    cy.wrap(null)
      .then(() => {
        profilePage.selectDeleteSkills();
      })
      .then(() => {
        verifyDeleteSkills();
      });
  });

  /**
   * Test Case-13: Verify that an Expense Type can be edited
   *
   * Objective:
   * Confirm that an existing expense type can be updated under Claim > Configuration > Expense Types,
   * and that the updated details appear in the expense type list.
   *
   * Steps:
   * 1. Login with valid credentials.
   * 2. Navigate to Claim tab.
   * 3. Open Configuration sub-tab.
   * 4. Select Expense Types.
   * 5. Edit an existing expense type by toggling the edit option.
   * 6. Update the details and save.
   * 7. Verify the updated details appear in the list.
   *
   * Expected:
   * The edited expense type should display the updated details in the expense type list.
   */
  it("TC-13: Verify that an Expense Type can be edited", () => {
    const oldExpenseName = `EditExp_${Math.floor(Math.random() * 1000)}`;
    const newExpenseName = `EditedExp_${Math.floor(Math.random() * 1000)}`;
    cy.wrap(null)
      .then(() => {
        claimPage.editExpense(oldExpenseName, newExpenseName);
      })
      .then(() => {
        verifyExpenseTypeEdited(newExpenseName);
      });
  });

  /**
   * Test Case-14: Verify that an Expense Type can be deleted
   *
   * Objective:
   * Confirm that an existing expense type can be deleted under Claim > Configuration > Expense Types,
   * and that the deleted expense no longer appears in the expense type list.
   *
   * Steps:
   * 1. Login with valid credentials.
   * 2. Navigate to Claim tab.
   * 3. Open Configuration sub-tab.
   * 4. Select Expense Types.
   * 5. Click the delete (trash) icon for a specific expense type.
   * 6. Confirm the deletion.
   * 7. Verify that the deleted expense type is no longer in the list.
   *
   * Expected:
   * The selected expense type should not appear in the expense type list after deletion.
   */
  it("TC-14: Verify the Immigrant assign immigration record Delete selected Functionality", () => {
    const EditexpenseName = `delExp_${Math.floor(Math.random() * 1000)}`;
    cy.wrap(null)
      .then(() => {
        claimPage.deleteExpense(EditexpenseName);
      })
      .then(() => {
        verifyExpenseTypeDeleted(EditexpenseName);
      });
  });

  /**
   * Test Case-15: Verify that multiple Expense Types can be selected and deleted
   *
   * Objective:
   * Confirm that multiple expense types can be selected in Claim > Configuration > Expense Types
   * and that all selected expense types are removed from the list after deletion.
   *
   * Steps:
   * 1. Login with valid credentials.
   * 2. Navigate to Claim tab.
   * 3. Open Configuration sub-tab.
   * 4. Select Expense Types.
   * 5. Add expense types for deletion.
   * 6. Select checkboxes for expense types.
   * 7. Click "Delete Selected".
   * 8. Confirm the deletion.
   * 9. Verify that both deleted expense types no longer appear in the list.
   *
   * Expected:
   * The selected expense types should be removed from the expense type list.
   */
  it("TC-15: Verify that multiple Expense Types can be selected and deleted", () => {
    const EditexpenseName = `delExp_${Math.floor(Math.random() * 1000)}`;
    claimPage.multipleExpenseDel(EditexpenseName);
    cy.get(".oxd-table-row").then(($rows) => {
      expect($rows.length).to.be.greaterThan(0);
      verifyMultipleExpenseTypeDeleted(EditexpenseName);
    });
  });
});

// ---------------------- Helper Functions ----------------------

// Helper function moved outside the describe block
// TC-1: Verify New 'Qualification' could be added to the record of user
function verifyWorkExpAdded(comment) {
  cy.contains(comment).should("be.visible");
}

// TC-2: Verify New 'Qualification' added could be edited from the record of user
function verifyEduRecordAdded(uniqueGpa) {
  cy.contains(uniqueGpa).should("be.visible");
}

// TC-3: Verify the qualification could be deleted
function verifyWorkExpDelete(comment) {
  cy.get(".oxd-toast")
    .should("be.visible")
    .and("contain", "Successfully Deleted");
  cy.contains(comment).should("not.exist");
}

// TC-4: Verify the qualification select delete functionality
function verifyMultipleWorkExpDelete() {
  cy.wait(2000);
  cy.get(".oxd-toast")
    .should("be.visible")
    .and("contain", "Successfully Deleted");
  cy.log("Record Deleted successfully");
}



// TC-5: Verify New 'Education' could be added to the record of user
function verifyEduRecordEdit(uniqueGpa) {
  cy.contains(uniqueGpa).should("be.visible");
}

// TC-6: Verify Event tab URL in Claim configuration
function verifyEventTabUrl(url) {
  expect(url).to.contain(
    "https://yakshahrm.makemylabs.in/orangehrm-5.7/web/index.php/claim/viewEvents"
  );
}

// TC-7: Verify Event creation in Claim configuration
function verifyEventCreated(eventName) {
  cy.contains(eventName).should("be.visible");
}

// TC-8: Verify Event Deletion in Claim Configuration
function verifyEventDeleted(eventName) {
  cy.contains(eventName).should("not.exist");
}

// TC-9: Event Inactive in Claim Configuration
function verifyEventInactive(status) {
  expect(status).to.eq("Inactive");
}

// TC-10: Verify that a new Expense Type can be added
function verifyExpenseTypeAdded(expenseName) {
  cy.contains(expenseName).should("be.visible");
}

// TC-11: Verify the 'Skills' could be deleted from the record
function verifySkillDeleted(year) {
  cy.get(".oxd-table-row").each(($row) => {
    const cellText = Cypress.$($row)
      .find(".oxd-table-cell")
      .eq(2)
      .text()
      .trim();
    expect(cellText).not.to.eq(year.toString());
  });
}

// TC-12: Verify the 'Skills' could be selected delete functionality
function verifyDeleteSkills() {
  cy.get(".oxd-toast")
    .should("be.visible")
    .and("contain", "Successfully Deleted");
}

// TC-13: Verify that an Expense Type can be edited
function verifyExpenseTypeEdited(newExpenseName) {
  cy.contains(newExpenseName).should("be.visible");
}

// TC-14: Verify Expense Type Delete selected functionality
function verifyExpenseTypeDeleted(expenseName) {
  cy.contains(expenseName).should("not.exist");
}

// TC-15: Verify that multiple Expense Types can be selected and deleted
function verifyMultipleExpenseTypeDeleted(expenseName) {
  cy.contains(expenseName).should("not.exist");
}
