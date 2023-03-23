const express = require("express");
const router = express.Router();
const { client, setAsync, getAsync } = require("../redis");

const configs = require("../util/config");

/* GET index data. */
router.get("/", async (req, res) => {
  let visits;

  const sitevisits = await getAsync("sitecounter");
  if (!sitevisits) {
    client.set("sitecounter", "1");
    visits = 1;
  } else {
    visits = parseInt(sitevisits) + 1;
    client.set("sitecounter", visits.toString());
  }

  res.send({
    ...configs,
    visits,
  });
});

module.exports = router;
