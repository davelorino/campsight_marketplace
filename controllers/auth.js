
// controllers auth

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
require('dotenv').config();

exports.signup = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if(userExists) 
      return res.status(403).json({
      error: "Email is taken!"
    });
  const user = await new User(req.body);
  await user.save();
  res.status(200).json({ user });
};

exports.signin = (req, res) => {
  // Find the user based on their email 
  const {_id, email, password} = req.body;
  User.findOne({email}, (err, user) => {
    // if err or no 
    if(err || !user) {
      return res.status(401).json({
        error: "User with that email does not exist. Please sign in."
      });
    }
    // if user is found make sure the email and password match
    // create authentication method in model and use here
    if(!user.authenticate(password)){
      return res.status(401).json({
        error: "Email and password do not match"
      });
    }
  // Generate a token with user ID and secret
  const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
  // Persist a token at 't' in cookie with expiry date
  res.cookie("t", token, {expire: new Date() + 10000});  
  // Return response with user and token to the frontend client
  const {_id, name, email} = user;
  return res.json({token, user: {_id, email, name}});
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  return res.json({message: "Signout Successful"});
};

exports.requireSignin = expressJwt({
  // if the token is valid then express jwt appends the verified users id in an auth key to the request 
  secret: process.env.JWT_SECRET,
  userProperty: "auth"
});



