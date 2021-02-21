const http = require("http");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportConfig = require("./config/passport-config");
const path = require("path");
const db = require("./config/db");
const routes = require("./routes/index");

passportConfig(passport);
passport.initialize();

const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "frontend", "build")));
}

app.use(routes);

app.use("*", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"))
);

app.listen(3004);
