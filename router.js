var express = require("express");
var router = express.Router();

const credential = {
  username: "admin",
  password: "admin",
};
//login user............
router.post("/login", (req, res) => {
  if (
    req.body.username == credential.username &&
    req.body.password == credential.password
  ) {
    req.session.user = req.body.username;
    if (req.session.user) {
      res.redirect("/route/home");
    }
  } else {
    if (req.body.username == "" || req.body.password == "") {
      req.session.err = "Username and password must not be empty";
      res.redirect("/");
    } else {
      req.session.err = "Invalid Username or Password";
      res.redirect("/");
    }
  }
});

//route for Home
router.get("/home", (req, res) => {
  if (req.session.user) {
    res.render("home", { user: req.session.user });
  } else {
    res.render("base");
  }
});

//route for logout
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.send("Error");
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;
