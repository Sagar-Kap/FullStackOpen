import { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(!visible);
  };

  return (
    <div>
      {blog.title} - {blog.author}{" "}
      <button onClick={onClick}>{visible ? "hide" : "show"}</button>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>{blog.likes}</div>
          <div>{blog.user.name}</div>
        </div>
      )}
    </div>
  );
};

export default Blog;
