const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const { getAsync, setAsync, client } = require("../redis");

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  const current = await getAsync("todocounter");
  if (!current) {
    (async () => {
      const count = await Todo.countDocuments();
      client.set("todocounter", count);
    })();
  }
  const newValue = parseInt(current) + 1;
  await setAsync("todocounter", newValue.toString());
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;
    req.todo = await Todo.findById(id);
    if (!req.todo) return res.status(404).send("Todo Not found");
  } catch (error) {
    res.status(500).send(error);
    return;
  }

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  return res.status(200).send(req.todo);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const { text, done } = req.body;
  const todo = req.todo;
  todo.text = text || todo.text;
  todo.done = done || todo.done;
  await todo.save();
  res.send(todo);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
