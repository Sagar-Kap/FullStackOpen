import { func } from "prop-types";

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

  describe("User can like a blog", function () {
    beforeEach(function () {
      cy.login({ username: "lmao", password: "lamfatraja" });
      cy.createBlog({
        title: "First Hum",
        author: "Nikal Yaha",
        url: "nikal.com/yahase",
      });
      cy.createBlog({
        title: "Second Hum",
        author: "Lolu",
        url: "jamai.com",
      });
      cy.createBlog({
        title: "Third Hum",
        author: "Lmfao",
        url: "chatpate.com/karare/blogs",
      });
    });

    it("Like must register", function () {
      cy.visit("http://localhost:3000/");
      cy.contains("First Hum").contains("Show").click();
      cy.contains("First Hum").parent().find("button").contains("👍").click();
      cy.contains("First Hum").parent().get(".likes").contains("1");
    });
  });

  describe("Delete blog", function () {
    beforeEach(function () {
      const newUser = {
        name: "Dusra Raja",
        username: "Dusra",
        password: "somethingIsWrong",
      };
      cy.createUser(newUser);
      cy.login({ username: "Dusra", password: "somethingIsWrong" });
      cy.createBlog({
        title: "Dusre Raja ne banaya hai",
        author: "Yamraj",
        url: "yamraj.com",
      });
      cy.contains("Logout").click();
      cy.login({ username: "lmao", password: "lamfatraja" });
      cy.createBlog({
        title: "First Hum",
        author: "Nikal Yaha",
        url: "nikal.com/yahase",
      });
      cy.createBlog({
        title: "Second Hum",
        author: "Lolu",
        url: "jamai.com",
      });
      cy.createBlog({
        title: "Third Hum",
        author: "Lmfao",
        url: "chatpate.com/karare/blogs",
      });
      cy.visit("http://localhost:3000/");
    });

    it("Delete blog by authorized user", function () {
      cy.contains("First Hum").contains("Show").click();
      cy.contains("First Hum")
        .parent()
        .find("button")
        .contains("Remove")
        .click();
      cy.get("html").should("not.contain", "First Hum");
    });

    it("If not authorizes cannot delete", function () {
      cy.contains("Dusre Raja ne banaya hai").contains("Show").click();
      cy.contains("Dusre Raja ne banaya hai")
        .parent()
        .should("not.contain", "Remove");
    });

    it("Blogs arranged in descending order based on like", function () {
      cy.contains("First Hum").contains("Show").click();
      cy.contains("First Hum")
        .parent()
        .find("button")
        .contains("👍")
        .click()
        .wait(500)
        .click()
        .wait(500)
        .click()
        .wait(500)
        .click()
        .wait(500);
      cy.contains("First Hum").contains("Hide").click();

      cy.contains("Second Hum").contains("Show").click();
      cy.contains("Second Hum")
        .parent()
        .find("button")
        .contains("👍")
        .click()
        .wait(500)
        .click()
        .wait(500)
        .click()
        .wait(500);
      cy.contains("Second Hum").contains("Hide").click();

      cy.contains("Third Hum").contains("Show").click();
      cy.contains("Third Hum")
        .parent()
        .find("button")
        .contains("👍")
        .click()
        .wait(500)
        .click()
        .wait(500);
      cy.contains("Third Hum").contains("Hide").click();

      cy.get(".blog").eq(0).should("contain", "First Hum");
      cy.get(".blog").eq(1).should("contain", "Second Hum");
      cy.get(".blog").eq(2).should("contain", "Third Hum");
      cy.get(".blog").eq(3).should("contain", "Dusre Raja ne banaya hai");
    });
  });
});
