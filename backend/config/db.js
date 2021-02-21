const mongoose = require("mongoose");
require("dotenv").config();
const db = mongoose
  .connect(process.env.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("db connected"))
  .catch(err => console.log(err));

module.exports = db;
