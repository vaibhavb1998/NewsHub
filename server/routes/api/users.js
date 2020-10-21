const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const Validator = require("validator");

// load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// load user model
const User = require("../../models/User");

// @route POST api/user/register
// @desc Register user
// @access Private to admin & issuer
router.post("/register", (req, res) => {
  // form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  console.log(errors, isValid)
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // find user by email in db
  User.findOne({ email: req.body.email }).then((user) => {
    // check if user exists
    if (user) {
      return res.status(400).send({
        status: "fail",
        currentAuthority: "admin",
        email: "Email already exists",
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
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  console.log("login api hit");

  // find user by email in db
  User.findOne({ email }).then((user) => {
    // check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // user matched
        const payload = {
          userid: user.id,
          avatar:
            "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
          phone: user.phone,
          name: user.name,
          email: user.email,
          role: user.role,
          issuerCreatedBy: user.issuerCreatedBy,
          investorCreatedBy: user.investorCreatedBy,
        };

        console.log("login success");

        // create JWT payload
        // sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 86400, // 1 day in seconds
          },
          (err, token) => {
            res.send({
              id: user._id,
              success: true,
              token: "Bearer " + token,
              status: "ok",
              email: user.email,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordIncorrect: "Password is incorrect" });
      }
    });
  });
});

module.exports = router;
