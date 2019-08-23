// routes posts

const express = require("express");
const {getPosts, 
      createPost, 
      postsByUser,
      isPoster,
      deletePost,
      postById,
      updatePost
} = require('../controllers/post');
const router = express.Router();
const {requireSignin} = require("../controllers/auth");
const {userById} = require("../controllers/user");
const {createPostValidator} = require("../validator");



router.get("/posts", getPosts);
router.post(
    "/post/:userId",
    requireSignin,
    createPost,
    createPostValidator
);
router.get("/posts/by/:userId", requireSignin, postsByUser);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);
router.put("/post/:postId", requireSignin, isPoster, updatePost);


// any route containing :userId, our app will first execute userById()
router.param("userId", userById);
router.param("postId", postById);


module.exports = router;
