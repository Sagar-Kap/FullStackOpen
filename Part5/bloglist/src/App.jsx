import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
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

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      setType("green");
      setMessage("Log In Successful!");

      setTimeout(() => {
        setType("");
        setMessage("");
      }, 5000);
    } catch (error) {
      setType("red");
      setMessage("Wrong Credentials");

      setTimeout(() => {
        setMessage("");
        setType("");
      }, 5000);
    }
  };

  return (
    <div>
      <Notification type={type} message={message} />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <h1>Blogs</h1>
          <h3>{user.name} logged in.</h3>
          {blogs.map((blog) => {
            return <Blog key={blog.id} blog={blog} />;
          })}
        </div>
      )}
    </div>
  );
};

export default App;
