function isString(obj) {
  return typeof obj === "string"
}


function isArray(obj) {
  return Object.prototype.toString.call(obj) === "[object Array]"
}


module.exports = {
  isString,
  isArray
}