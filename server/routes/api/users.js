const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// load user model
const User = require("../../models/User");

// @route POST api/user/register
// @desc Register user
router.post("/register", (req, res) => {
  // form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  console.log(errors, isValid)
  // check validation
  if (!isValid) {
    return res.status(400).json({ status: false, msg: errors.msg });
  }

  // find user by email in db
  User.findOne({ email: req.body.email }).then((user) => {
    // check if user exists
    if (user) {
      return res.status(400).send({
        status: false,
        msg: "Email already exists",
      });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      console.log("register api hit");

      // hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              console.log("register user successful");
              console.log(user);
              res.status(200).send({
                status: "ok",
              });
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/user/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json({ status: false, msg: errors.msg });
  }

  const email = req.body.email;
  const password = req.body.password;

  console.log("login api hit");

  // find user by email in db
  User.findOne({ email }).then((user) => {
    // check if user exists
    if (!user) {
      return res.status(404).json({ status: false, msg: "Email not found" });
    }

    // check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // user matched

        console.log("login success");

        // create JWT payload
        // sign token
        jwt.sign(
          keys.secretOrKey,
          {
            expiresIn: 86400, // 1 day in seconds
          },
          (err, token) => {
            res.send({
              id: user._id,
              token: "Bearer " + token,
              status: true,
              email: user.email,
              isAdmin: user.isAdmin,
              msg: "registration successful"
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ status: false, msg: "Password is incorrect" });
      }
    });
  });
});


// @route get api/user/get-selected-source-list
// @desc return selected source list by user
router.get("/get-selected-source-list", (req, res) => {

  User.find({ isAdmin: true })
    .then((source) => {
      if (source) {
        res.json({ status: true, data: source });
      } else {
        res.json({ status: false, msg: "Issuances not found" });
      }
    })
    .catch((err) => {
      return res.status(500).send("Something went wrong");
    });
});

// @route PUT api/user/set-selected-source-list
// @desc set selected source list by user
router.put("/set-selected-source-list", (req, res) => {
  User.find({ isAdmin: true })
    .updateOne({ $addToSet: { sourcesId: req.body } })
    .then((source) => {
      if (source) {
        res.json({ status: true, data: source });
      } else {
        res.json({ status: false, msg: "Issuances not found" });
      }
    })
    .catch((err) => {
      return res.status(500).send("Something went wrong");
    });
});

module.exports = router;
