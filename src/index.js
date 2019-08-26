const t = require("babel-types")
const {isString, isArray} = require("./util")

const DEFAULT_NAMES_ARRAY = ["global", "hotUpdate"]


function createMemberExpression(arr) {
  if (arr.length > 2) {
    let last = arr.pop()
    return t.memberExpression(createMemberExpression(arr), t.identifier(last))
  } else {
    return t.memberExpression(t.identifier(arr[0]), t.identifier(arr[1]))
  }
}

function getNamesArr(globalName) {
  let namesArr = []
  if (globalName) {
    if (isString(globalName)) {
      namesArr = globalName.split(".")
    } else if (isArray(globalName)) {
      namesArr = globalName
    }
  } else {
    namesArr = DEFAULT_NAMES_ARRAY
  }
  return namesArr
}


function dealOptions(options) {
  // console.log("options", options)
  let namesArr = getNamesArr(options.globalName)
  let ifMemberExpression = namesArr.length === 1 ? t.identifier(namesArr[0]) : createMemberExpression(namesArr)
  // console.log("ifMemberExpression", ifMemberExpression)
  return {ifMemberExpression}
}


function getIfBlockStatement(callee, params) {
  return t.blockStatement([
    t.expressionStatement(t.callExpression(callee, params))
  ])
}


function replaceFunc(path, state) {
  // 处理接收到的options
  const {ifMemberExpression} = dealOptions(state.opts)
  let node = path.node
  // console.log("path.node", node)
  let funcId = node.id
  let funcName = node.id.name  //函数名
  // console.log("node.id", funcName)
  let funcParams = node.params // 函数参数
  // console.log("node.params", funcParams)
  let funcWrapperBody = node.body //函数包裹
  // console.log("node.body", body)

  let funcBody = node.body.body //函数主体
  // console.log("node.body.body", node.body.body)

  let generator = node.generator  //是否是generator
  console.log("generator", generator)

  let async = node.async //是否是async
  console.log("async", async)
  // 判断
  let test = ifMemberExpression
  // if作用域块
  let consequent = getIfBlockStatement(ifMemberExpression, funcParams)
  // else作用域块
  let alternate = t.blockStatement(funcBody)
  // 箭头函数体
  let newFunctionBody = t.blockStatement([t.ifStatement(test, consequent, alternate)])
  // 箭头函数
  let newFunctionDeclaration = t.functionDeclaration(funcId, funcParams, newFunctionBody, generator, async)

  path.replaceWith(newFunctionDeclaration)

  path.stop()
}

const visitor = {
  FunctionDeclaration(path, state) {
    replaceFunc(path, state)
  },
  FunctionExpression(path, state) {
    replaceFunc(path, state)
  }
}


module.exports = function (babel) {
  return {
    pre(state) {
      // console.log("pre111", state)
    },
    visitor,
    post(state) {
      // console.log("post111", state)
    }
  }
}