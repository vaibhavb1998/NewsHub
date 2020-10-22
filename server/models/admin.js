const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const adminSchema = new Schema({
  sourcesId: {
    type: Array,
    default: [],
  },
});

module.exports = Admin = mongoose.model("admin", adminSchema);
