const express = require("express");
const bodyParser = require("body-parser");
const log = require("debug")("lv-puppeteer:app");
const createBrowser = require("./lib/browser");
const cdr = require("./lib/cdr");

const SECRET = process.env.SECRET || "secret";

const app = express();
app.use(bodyParser.json());

const required_keys = ["date", "client_id", "map_id"];
app.post("/cdr", async (req, res) => {
  if (!req.query.secret) {
    return res
      .status(403)
      .json({ error: "Forbidden", message: "Missing secret query parameter" });
  } else if (req.query.secret != SECRET) {
    return res
      .status(403)
      .json({ error: "Forbidden", message: "Wrong secret" });
  } else if (required_keys.every(key => req.body[key]) === true) {
    const browser = await createBrowser();
    const contents = await cdr(browser, {
      date: req.body.date,
      client_id: req.body.client_id,
      map_id: req.body.map_id
    });
    res.json({ contents });
    return await browser.browser.close();
  } else {
    return res.status(400).json({
      error: "Bad request",
      message: "Missing one of 'date', 'client_id', or 'map_id' in POST body"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  log("Server started at %d", PORT);
});
