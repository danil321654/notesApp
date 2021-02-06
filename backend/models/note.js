const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const noteSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

noteSchema.pre("find", function(next) {
  this.populate("note").populate("user");
  next();
});

module.exports = mongoose.model("notes", noteSchema);
