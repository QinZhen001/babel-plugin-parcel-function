const {transform} = require("babel-core")

const defaultPluginPath = "./src/index.js"

function testPlugin(code, presets, plugins, options = {}) {
  const result = transform(code, {
    presets: [].concat(presets || []),
    plugins: [].concat(plugins || [], [[defaultPluginPath, options]])
  })
  return result.code
}


function removeSpace(str) {
  return str.replace(/\s*/g, "");
}


module.exports = {
  testPlugin,
  removeSpace
}