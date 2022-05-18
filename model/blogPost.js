const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  body: String,
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  datePosted: {
    type: Date,
    default: new Date(),
  },
  image: String,
});

const BlogPost = mongoose.model("blogPost", BlogPostSchema);
module.exports = BlogPost;
