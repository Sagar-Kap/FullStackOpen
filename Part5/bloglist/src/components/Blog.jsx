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
    <div>
      {blog.title} - {blog.author}{" "}
      <button onClick={onClick}>{visible ? "hide" : "show"}</button>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes} <button onClick={handleLike}>Like</button>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.username === username && (
            <button onClick={handleDelete}>Remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
