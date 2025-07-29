const validator = require('validator');

function isValidUUID(value) {
  return validator.isUUID(value);
}

module.exports = { isValidUUID };