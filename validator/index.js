

exports.createPostValidator = (req, res, next) => {
  // Validate the Post Title
  req.check("title", "Write a title").notEmpty();
  req.check("title", "Title must be between 4 and 150 characters long").isLength({
    min: 4,
    max: 2000
  });
  // Validate the Post Body
  req.check("body", "Write a body").notEmpty();
  req.check("body", "Body must be between 4 to 2000 characters").isLength({
    min: 4,
    max: 5000
  });
  // Check for Errors
  const errors = req.validationErrors();
  if(errors){
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};


exports.userSignupValidator = (req, res, next) => {
  // Name is not NULL and between 2 - 20 characters long
  req.check("name", "Name is required").notEmpty();
  
  //Email is Not NULL
  req.check("email", "Email must be between 3 to 60 characters long")
  .matches(/.+\@.+\..+/)
  .withMessage("Email must contain '@'")
  .isLength({
    min: 4,
    max: 2000
  });
  
  // Check for Password
  req.check("password", "Password is required").notEmpty();
  req.check("password")
  .isLength({min: 6}).withMessage("Password must contain atleast 6 characters")
  .matches(/\d/).withMessage("Password must contain a number");
  
  // Check for Errors
  const errors = req.validationErrors();
  
  // If there is an error show the first error
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // Proceed to the next middleware
  next();
}; 




