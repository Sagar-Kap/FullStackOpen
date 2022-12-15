const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./listHelper.test");

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
  test("check if total number of blogs has increased", async () => {
    const newBlog = {
      title: "Ek Blog",
      author: "Log kya kahenge",
      url: "logkyakahenge.in",
      likes: 98,
    };
    await api
      .post("/api/blogs/")
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

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsInDb = await helper.blogsDb();
    expect(blogsInDb).toHaveLength(helper.blogs.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
