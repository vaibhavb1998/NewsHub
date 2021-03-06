const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const upload = require("express-fileupload");
const fs = require("fs");

router.use(upload());

// load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// load user model
const Admin = require("../../models/admin");
const News = require("../../models/news");

// setting file upload data
let fileUpload;

// @route get api/admin/get-selected-source-list
// @desc return selected source list by admin
router.get("/get-selected-source-list", (req, res) => {
  Admin.find()
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

// @route PUT api/admin/set-selected-source-list
// @desc set selected source list by admin
router.get("/set-selected-source-list", (req, res) => {
  SelectedNewsSource.find()
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

// @route POST api/admin/register
// @desc Register new admin
router.post("/register/new-admin", (req, res) => {
  console.log("register api hit");

  // form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  console.log(errors, isValid);
  // check validation
  if (!isValid) {
    return res.status(400).json({ status: false, msg: errors.msg });
  }

  // find user by email in db
  User.findOne({ email: req.body.email }).then((user) => {
    // check if user exists
    if (user) {
      console.log("email already exists");
      return res.status(400).send({
        status: false,
        msg: "Email already exists",
      });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: true,
      });

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

router.post("/create/upload", (req, res) => {
  fileUpload = req.files;
  res.status(200).send({
    status: "ok",
  });
});

// @route POST api/create/news
// @desc create news
router.post("/create/news", (req, res) => {
  console.log("create news api hit");
  let imageUrl = "";

  const file = fileUpload.file;
  const filename = file.name;

  file.mv("./upload/" + filename, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json(errors);
    } else {
      console.log("file moved successfully");
      imageUrl = filename;

      console.log("process", process.cwd() + "/../../upload/" + filename);

      console.log(imageUrl);
      const newNews = new News({
        name: req.body.name,
        category: req.body.category,
        language: req.body.language,
        description: req.body.description,
        content: req.body.content,
        imageUrl,
        author: req.body.author,
        date: req.body.date,
      });

      newNews
        .save()
        .then((response) => {
          console.log("News added successfully");
          console.log(response);
          res.status(200).send({
            status: "ok",
          });
        })
        .catch((err) => console.log(err));
    }
  });
});

// @route DELETE api/admin/delete/news
// @desc Delete news
router.delete("/delete/news", (req, res) => {
  console.log("Delete news api hit");

  console.log(req.query.newsId);

  News.remove({ _id: req.query.newsId })
    .then((response) => {
      console.log("News deleted successfully");
      console.log(response);
      res.status(200).send({
        status: "ok",
      });
    })
    .catch((err) => console.log(err));
});

// @route POST api/edit/news
// @desc edit news
router.put("/edit/news", async (req, res) => {
  console.log("edit news api hit");

  try {
    const response = await News.findOneAndUpdate(
      { _id: req.query.newsId },
      {
        name: req.body.name,
        description: req.body.description,
        content: req.body.content,
      }
    );
    console.log(response)

    res.status(200).send({
      status: "ok",
    });
  } catch (err) {
    console.log("some error occurred: ", err);
  }
});

module.exports = router;
