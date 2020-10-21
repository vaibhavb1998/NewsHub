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
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(user.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (_.isEmpty(user.password)) {
    errors.password = "Password field is required";
  } else if (!Validator.isLength(user.password, { min: 6 })) {
    errors.password = "Password must be at least 6 characters";
  }

  return {
    errors,
    isValid: _.isEmpty(errors),
  };
};
