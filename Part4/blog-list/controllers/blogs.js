const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const mongoose = require("mongoose");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });

  if (blogs) {
    response.json(blogs);
  } else {
    response.status(400).end();
  }
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const token = request.token;

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, config.SECRET);
  } catch (error) {
    return response.status(401).json({ error: "Invalid Token" });
  }

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = request.user;

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
  const token = request.token;
  const decodedToken = jwt.verify(token, config.SECRET);

  if (!(token && decodedToken.id)) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const id = request.params.id;
  const blog = await Blog.findById(id);
  const user = request.user;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ error: "invalid ID" });
  }

  if (blog.user.toString() === user.id.toString()) {
    await Blog.deleteOne({ _id: id });
    response.sendStatus(204).end();
  } else {
    response.status(401).json({ error: "unauthorized operation" });
  }
});

blogsRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ error: "invalid ID" });
  }
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.status(200).json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

blogsRouter.put("/:id", async (request, response) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    return response.status(400).json({ error: "invalid ID" });
  }

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
