const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const session = require("express-session");

const { v4: uuidv4 } = require("uuid");
const router = require("./router");
const app = express();

const port = process.env.PORT || 4040;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use((req, res, next) => {
  if (!req.user) {
    res.header(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
  }
  next();
});

app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/route", router);
//home route
app.get("/", (req, res) => {
  if (req.session.user) {
    res.render("home", { user: req.session.user });
  } else {
    var invalid = req.session.err;
    req.session.err = null;
    res.render("base", { title: "log-in system", invalid });
  }
});

app.listen(port, () => {
  console.log("Running the server at http://localhost:4040");
});
