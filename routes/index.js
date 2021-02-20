const express = require("express");
const auth = require("./auth");
const note = require("./note");
const router = express.Router();

router.use(auth);
router.use(note);

router.get("/", (req, res) =>
  req.user ? res.redirect("/notes") : res.redirect("/login")
);

module.exports = router;
