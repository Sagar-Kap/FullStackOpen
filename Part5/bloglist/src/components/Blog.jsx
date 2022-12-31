import { useState } from "react";

const Blog = ({ blog, updateLike, deleteBlog, username }) => {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user,
    };

    updateLike(blog.id, blogToUpdate);
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id);
    }
  };

  return (
    <div className="blog">
      <div className="first-line">
        {blog.title} {visible ? "" : ` - ${blog.author}`}{" "}
        <button onClick={onClick}>{visible ? "Hide" : "Show"}</button>
      </div>
      {visible && (
        <div className="bottom-box">
          <div>Author: {blog.author}</div>
          <div>URL: {blog.url}</div>
          <div>
            Likes: {blog.likes} <button onClick={handleLike}>👍</button>
          </div>
          <div>User: {blog.user.name}</div>
          {blog.user.username === username && (
            <button className="remove" onClick={handleDelete}>
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
