import { useState } from "react";

const Blog = ({ blog, updateLike }) => {
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
        </div>
      )}
    </div>
  );
};

export default Blog;
