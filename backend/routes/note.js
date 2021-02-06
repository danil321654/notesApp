const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const Note = require("../models/note");
const User = require("../models/user");
require("dotenv").config();

router.get(
  "/notes",
  passport.authenticate("jwt", {session: false}),
  async (req, res, next) => {
    if (!req.user) return res.sendStatus(401);
    let user;
    try {
      user = await User.findOne({
        username: req.user.username
      });
    } catch (e) {
      return res.sendStatus(500);
    }

    if (!user) return res.sendStatus(401);
    let notes;
    try {
      notes = await Note.find({
        user: user["_id"]
      });
    } catch (e) {
      return res.sendStatus(500);
    }

    return res.send(notes.length ? notes : []);
  }
);

router.post(
  "/note",
  passport.authenticate("jwt", {session: false}),
  async (req, res, next) => {
    if (!req.user) return res.sendStatus(401);
    let user;
    try {
      user = await User.findOne({
        username: req.user.username
      });
    } catch (e) {
      return res.sendStatus(500);
    }

    if (!user) return res.sendStatus(401);

    let newNote = new Note({
      name: req.body.name,
      description: req.body.description,
      user: user["_id"]
    });

    try {
      await newNote.save();
    } catch (e) {
      return res.sendStatus(500);
    }

    return res.send("node added");
  }
);

module.exports = router;
