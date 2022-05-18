const BlogPost = require("../model/blogPost.js");
module.exports = async (req, res) => {
  const blogposts = await BlogPost.findById(req.params.id).populate("userid");
  console.log(blogposts);
  res.render("post", {
    blogposts,
  });
};
