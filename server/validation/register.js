const Validator = require("validator");
const _ = require('lodash')

module.exports = function validateRegisterInput(user) {
  let errors = {};

  // Name checks
  if (_.isEmpty(user.name)) {
    errors.name = "Name field is required";
  }

  // Email checks
  if (_.isEmpty(user.email)) {
    errors.msg = "Email field is required";
  } else if (!Validator.isEmail(user.email)) {
    errors.msg = "Email is invalid";
  }
  // Password checks
  else if (_.isEmpty(user.password)) {
    errors.msg = "Password field is required";
  } else if (false) {
    errors.msg = "Password must be at least 6 characters";
  }

  return {
    errors,
    isValid: _.isEmpty(errors),
  };
};
