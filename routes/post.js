// routes posts

const express = require("express");
const {getPosts, createPost} = require('../controllers/post');
const router = express.Router();
const {requireSignin} = require("../controllers/auth");
const {userById} = require("../controllers/user");
const {createPostValidator} = require("../validator");


router.get("/", getPosts);
router.post(
    "/post/:userId",
    requireSignin,
    createPost,
    createPostValidator
);


// any route containing :userId, our app will first execute userById()
router.param("userId", userById);

module.exports = router;
