const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const colorValidator = v => /^#([0-9a-f]{3}){1,2}$/i.test(v);

const noteSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    validator: [colorValidator, "Invalid color"],
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
