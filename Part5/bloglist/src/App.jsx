import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setType("green");
      setMessage("Log In Successful!");

      setTimeout(() => {
        setType("");
        setMessage("");
      }, 2000);
    } catch (error) {
      setType("red");
      setMessage("Wrong Credentials");

      setTimeout(() => {
        setMessage("");
        setType("");
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const createBlog = async (title, author, url) => {
    try {
      blogFormRef.current.toggleVisibility();
      const blog = await blogService.create({
        title,
        author,
        url,
      });
      setBlogs(blogs.concat(blog));
      setType("green");
      setMessage(`A new blog ${title} by ${author} added`);
      setTimeout(() => {
        setMessage("");
        setType("");
      }, 5000);
    } catch (error) {
      setType("red");
      setMessage(`Error in creating the blog!`);
      setTimeout(() => {
        setMessage("");
        setType("");
      }, 5000);
    }
  };

  const blogFormRef = useRef();

  return (
    <div>
      {user === null ? null : <h1>Blogs</h1>}
      <Notification type={type} message={message} />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <h3>
            {user.name} logged in.{" "}
            <button onClick={handleLogout}>Logout</button>
          </h3>
          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {blogs.map((blog) => {
            return <Blog key={blog.id} blog={blog} />;
          })}
        </div>
      )}
    </div>
  );
};

export default App;
