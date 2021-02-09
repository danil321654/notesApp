const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/user");
require("dotenv").config();

router.post("/register", (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: "Please pass username and password."});
  } else {
    let newUser = new User({
      username: req.body.username,
      password: req.body.password
    });

    newUser.save(function(err) {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          msg: `User ${req.body.username} exists.`
        });
      }
      res.json({success: true, msg: "Successful created new user."});
    });
  }
});

router.post("/login", (req, res) => {
  User.findOne(
    {
      username: req.body.username
    },
    function(err, user) {
      if (err) throw err;

      if (!user) {
        res.status(401).send({
          success: false,
          msg: "Authentication failed. User not found."
        });
      } else {
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            let token = jwt.sign(user.toJSON(), process.env.secret);
            res.json({success: true, token: "Bearer " + token});
          } else {
            console.log(err);
            res.status(401).send({
              success: false,
              msg: "Authentication failed."
            });
          }
        });
      }
    }
  );
});

router.get(
  "/is_logged_in",
  passport.authenticate("jwt", {session: false}),
  (req, res) => {
    res.send({success: true});
  }
);
router.get("/", (req, res) => res.send("/"));

router.get(
  "/logout",
  passport.authenticate("jwt", {session: false}),
  (req, res) => {
    req.logout();
    res.redirect("/");
  }
);

module.exports = router;
