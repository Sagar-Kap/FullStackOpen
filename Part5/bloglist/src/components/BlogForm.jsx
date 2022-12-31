import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createBlog(newBlog.title, newBlog.author, newBlog.url);
    setNewBlog({ title: "", author: "", url: "" });
  };

  return (
    <div className="new-blog">
      <form onSubmit={onSubmit}>
        <table>
          <tr>
            <td>Title</td>
            <td>
              <input
                type="text"
                name="title"
                value={newBlog.title}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>Author</td>
            <td>
              <input
                type="text"
                name="author"
                value={newBlog.author}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>URL</td>
            <td>
              <input
                type="text"
                name="url"
                value={newBlog.url}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button className="submit" type="submit">
                Create
              </button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default BlogForm;
