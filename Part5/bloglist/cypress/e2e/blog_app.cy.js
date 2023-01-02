describe("Note app", function () {
  it("front page can be opened", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Log in to the application");
  });
});
