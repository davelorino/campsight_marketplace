const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const morgan = require("morgan");
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const Post = require('./models/post');
const postController = require('./controllers/post');
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");


dotenv.config();

// db
mongoose.connect(
  process.env.MONGO_URI,
  {useNewUrlParser: true}
)
.then(() => console.log('DB Connected'));

// error handle
mongoose.connection.on('error', err => {
  console.log(`DB Connection Error: ${err.message}`);
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(expressValidator());
app.use("/", postRoutes);
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use(function (err, req, res, next){
  if(err.name === 'UnauthorizedError'){
    res.status(401).json({error: 'Unauthorised'});
  }
});



const port = process.env.PORT || 8080;
app.listen(port, () => {console.log(`A Node JS API is listening on port: ${port}`);
});