// routes user

const express = require("express");
const {userById, allUsers, getUser} = require("../controllers/user");
const router = express.Router();

router.get("/users", allUsers);
router.get("/user/:userId", getUser);

// any route containing :userId, our app will first execute userById
router.param("userId", userById);

module.exports = router;
