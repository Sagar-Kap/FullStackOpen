const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./listHelper.test");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../utils/config");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.blogs);
});

describe("When initially some blogs are added to db", () => {
  test("Blogs are returned as json", async () => {
    await api
      .get("/api/blogs/")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("Verify the unique identifier property is named id", async () => {
    const response = await api.get("/api/blogs");
    const idArray = response.body.map((blog) => blog.id);
    for (let i in idArray) {
      expect(i).toBeDefined();
    }
  });
});

describe("Addition of a new blog", () => {
  let token = null;
  beforeAll(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("12345", 10);
    const user = await new User({ username: "name", passwordHash }).save();

    const userForToken = { username: "name", id: user.id };
    return (token = jwt.sign(userForToken, config.SECRET));
  });

  test("check if total number of blogs has increased", async () => {
    const newBlog = {
      title: "Ek Blog",
      author: "Log kya kahenge",
      url: "logkyakahenge.in",
      likes: 98,
    };
    await api
      .post("/api/blogs/")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    console.log("response", response.body.length);

    expect(response.body).toHaveLength(helper.blogs.length + 1);
  });

  test("likes value defaults to 0 if property missing", async () => {
    const newBlog = {
      title: "0 to hero",
      author: "0 liker",
      url: "asjehjsdfsd.com",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const blogsLast = await helper.blogsDb();
    expect(blogsLast).toHaveLength(helper.blogs.length + 1);
    expect(blogsLast[blogsLast.length - 1].likes).toBe(0);
  });

  test("missing URL and title", async () => {
    const newBlog = {
      likes: 9,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const blogsInDb = await helper.blogsDb();
    expect(blogsInDb).toHaveLength(helper.blogs.length);
  });

  test("Status code returns 401 if token not provided", async () => {
    const newBlog = {
      title: "0 ero",
      author: "yuyer",
      url: "asjjsdfsd.com",
      likes: 8989,
    };
    const unauthorized = "asdadasdfgfhgfhththgfhgfh12";

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${unauthorized}`)
      .send(newBlog)
      .expect(401);

    const blogsInDb = await helper.blogsDb();
    expect(blogsInDb).toHaveLength(helper.blogs.length);
  });
});

describe("deleting blog with specific id", () => {
  let token = null;
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("12345", 10);
    const user = await new User({ username: "name", passwordHash }).save();

    const userForToken = { username: "name", id: user.id };
    token = jwt.sign(userForToken, config.SECRET);

    const newBlog = {
      title: "Blog Ratta",
      author: "The Best Author",
      url: "https://wwkahaok.com",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    return token;
  });

  test("delete based on id", async () => {
    const id = helper.blogs[0].id;

    await api.delete(`/:${id}`);
    expect(204);
  });
});

describe("update likes", () => {
  test("Update the value of likes", async () => {
    const blogsInStart = await helper.blogsDb();
    const blogsUpdate = blogsInStart[1];

    await api
      .put(`/api/blogs/${blogsUpdate.id}`)
      .send({ likes: 12121 })
      .expect(201);
    const blogsAtEnd = await helper.blogsDb();
    const updatedBlog = blogsAtEnd[1];
    expect(blogsAtEnd).toHaveLength(helper.blogs.length);
    expect(updatedBlog.likes).toBe(12121);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
