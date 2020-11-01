const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const NewsSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
    require: false,
    default: '',
  },
  category: {
    type: String,
    require: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
});

module.exports = News = mongoose.model("news", NewsSchema);
