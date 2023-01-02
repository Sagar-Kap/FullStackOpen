import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
let component;

describe("Renders blog on the screen", () => {
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

    component = render(<Blog blog={blog} />);

    expect(component.container.querySelector(".blog")).toHaveTextContent(
      "Component gets rendered with this test"
    );
    expect(component.container.querySelector(".blog")).toHaveTextContent(
      "Test1"
    );
    expect(component.container.querySelector(".blog")).not.toHaveTextContent(
      "test.com/test1"
    );
    expect(component.container.querySelector(".blog")).not.toHaveTextContent(
      "787"
    );
  });
});

describe("Clicking the button shows other details", () => {
  test("Clicking the button shows other details", async () => {
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

    component = render(<Blog blog={blog} />);

    const user = userEvent.setup();
    const button = screen.getByText("Show");
    await user.click(button);
    expect(component.container.querySelector(".blog")).toHaveTextContent(
      "test.com/test1"
    );
    expect(component.container.querySelector(".blog")).toHaveTextContent("787");
  });
});

describe("Check like button", () => {
  test("Get two event calls when like button is clicked twice", async () => {
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

    const mockHandler = jest.fn();

    component = render(<Blog blog={blog} updateLike={mockHandler} />);

    const user = userEvent.setup();
    let button = screen.getByText("Show");
    await user.click(button);

    button = screen.getByText("👍");
    await user.click(button);
    await user.click(button);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
