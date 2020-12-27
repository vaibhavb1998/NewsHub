// imports
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const dbConfig = require("./database/db");
const createError = require("http-errors");
const cors = require("cors");

const users = require("./routes/api/users");
const admins = require("./routes/api/admins");

const app = express();

// bodyParser middleware
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json());

// cors
app.use(cors());

// connect mongodb
mongoose
  .connect(dbConfig.db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Successfully Connected."))
  .catch((err) => console.log("MongoDB connection error: ", err));

// passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport);

// routes
app.use("/api/user", users);
app.use("/api/admin", admins);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port}!`));

// error handling
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
