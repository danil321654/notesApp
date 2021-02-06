const http = require("http");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportConfig = require("./config/passport-config");
const db = require("./config/db");
const routes = require("./routes/index");

passportConfig(passport);
passport.initialize();

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(3003);
