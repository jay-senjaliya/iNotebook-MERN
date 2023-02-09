const mongoose = require("mongoose");
const User = require("./User");

const notesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Plase enter a title!!"],
    minLength: [5, "Plase give title of minimum length 3."],
  },
  description: {
    type: String,
    required: [true, "Plaese enter a description!!"],
    minLength: [5, "Plase give description of minimum length 5."],
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;
