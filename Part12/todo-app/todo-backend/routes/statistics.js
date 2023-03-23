const express = require("express");
const router = express.Router();
const { getAsync, setAsync } = require("../redis");

router.get("/", async (req, res) => {
	try {
		let count = await getAsync("todocounter");
		res.send({ added_todos: count });
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
