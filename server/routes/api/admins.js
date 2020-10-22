const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// load user model
const Admin = require("../../models/admin");

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

module.exports = router;
