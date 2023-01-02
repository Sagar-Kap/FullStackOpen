import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("Renders blog on the screen", () => {
  const blog = {
    title: "Component gets rendered with this test",
    author: "Test1",
    url: "test.com/test1",
    likes: 787,
    user: {
      username: "jhing",
    },
    username: "jhing",
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container.querySelector(".blog")).toHaveTextContent(
    "Component gets rendered with this test"
  );
  expect(component.container.querySelector(".blog")).toHaveTextContent("Test1");
  expect(component.container.querySelector(".blog")).not.toHaveTextContent(
    "test.com/test1"
  );
  expect(component.container.querySelector(".blog")).not.toHaveTextContent(
    "787"
  );
});
