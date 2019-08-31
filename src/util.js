function isString(obj) {
  return typeof obj === "string"
}


function isArray(obj) {
  return Object.prototype.toString.call(obj) === "[object Array]"
}


function getPathSuffix(str) {
  let match = str.match(/\S+\\(\S+?)\.\S*$/)
  if (match && match[1]) {
    return match[1]
  }
  return null
}


module.exports = {
  isString,
  isArray,
  getPathSuffix
}