import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
let component;

describe("When a new blog gets created", () => {
  test("Data sent with the form", async () => {
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

    component = render(<BlogForm createBlog={mockHandler} />);
    const titleInput = component.container.querySelector("[name='title']");
    const authorInput = component.container.querySelector("[name='author']");
    const urlInput = component.container.querySelector("[name='url']");
    await userEvent.type(titleInput, blog.title);
    await userEvent.type(authorInput, blog.author);
    await userEvent.type(urlInput, blog.url);

    const user = userEvent.setup();
    let button = screen.getByText("Create");
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0]).toBe(
      "Component gets rendered with this test"
    );
    expect(mockHandler.mock.calls[0][1]).toBe("Test1");
    expect(mockHandler.mock.calls[0][2]).toBe("test.com/test1");
  });
});
