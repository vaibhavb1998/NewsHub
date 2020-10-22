const Validator = require("validator");
const _ = require('lodash');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !_.isEmpty(data.email) ? data.email : "";
  data.password = !_.isEmpty(data.password) ? data.password : "";

  // Email checks
  if (_.isEmpty(data.email)) {
    errors.msg = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.msg = "Email is invalid";
  } 
  // Password checks
  else if (_.isEmpty(data.password)) {
    errors.msg = "Password field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors),
  };
};
