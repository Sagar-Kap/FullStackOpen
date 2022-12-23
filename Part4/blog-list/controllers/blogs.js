const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  if (blogs) {
    response.json(blogs);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findById(body.userId);

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: "missing title or url",
    });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const r = await Blog.findByIdAndRemove(request.params.id);
  if (r) {
    response.status(204).end();
  } else {
    response.status(401).json({ error: "unauthorised operation" }).end();
  }
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.status(200).json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const { likes } = request.body;
  console.log({ likes });
  const updateBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes },
    {
      new: true,
    }
  );
  if (updateBlog) {
    response.status(201).json(updateBlog.toJSON()).end();
  } else {
    response.status(404).end();
  }
});

module.exports = blogsRouter;
