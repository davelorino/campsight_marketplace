const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const morgan = require("morgan");
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const Post = require('./models/post');
const postController = require('./controllers/post');
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const cors = require('cors');

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


//apiDocs
app.get("/", (req, res) => {
  fs.readFile("docs/apiDocs.json", (err, data) => {
    if(err) {
      return res.status(400).json({
        error: err
      });
    }
    const docs = JSON.parse(data);
    res.json(docs);
  });
});

app.use(cors());
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