
const Post = require("../models/post");

// controllers

exports.getPosts = (req, res) => {
  const posts = Post.find()
  .then(posts => {
    res.status(200).json({posts: posts});
  }) 
  .catch(err => console.log(err));
};

exports.createPost = (req, res) => {
  const post = new Post(req.body);
  console.log("Post:", req.body);
  post.save().then(result => {
    res.status(200).json({
      post: result
    });
  });
};