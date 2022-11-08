
describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
});

describe("Tuesday", () => {
  it("should navigate to Tuesday", () => {
    cy.visit("/");

    cy.get("li").contains("Tuesday")
      .click();

  });

  it("should css class day-list__item--selected on Tuesday", () => {
    cy.visit("/");

    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });

});