describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const newUser = {
      name: "Lamfat",
      username: "lmao",
      password: "lamfatraja",
    };
    cy.request("POST", "http://localhost:3003/api/users", newUser);
    cy.visit("http://localhost:3000/");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to the application");
  });

  describe("Login", function () {
    it("Succeeds with correct credentials", function () {
      cy.get("input:first").type("lmao");
      cy.get("input:last").type("lamfatraja");
      cy.contains("Login").click();
      cy.contains("Log In Successful!");
    });

    it("Fails with wrong credentials", function () {
      cy.get("input:first").type("nikal");
      cy.get("input:last").type("chupchapnikal");
      cy.contains("Login").click();
      cy.contains("Wrong Credentials!");
      cy.get(".red").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "lmao", password: "lamfatraja" });
    });

    it("a blog can be created", function () {
      cy.contains("New Blog").click();
      cy.get("#title").type("Sleep in the night");
      cy.get("#author").type("Sleepless");
      cy.get("#url").type("https://www.sleepless.com/");
      cy.contains("Create").click();

      cy.contains("Sleep in the night");
    });
  });
});
