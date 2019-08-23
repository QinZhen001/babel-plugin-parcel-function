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


function dealOptions(options) {
  let globalName = options.globalName
  console.log("options", options)
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
  let ifMemberExpression = namesArr.length === 1 ? t.identifier(namesArr[0]) : createMemberExpression(namesArr)
  console.log("ifMemberExpression", ifMemberExpression)
  return ifMemberExpression
}

const visitor = {
  FunctionDeclaration(path, state) {
    // console.log("111", path.key)
    // console.log("222", state.key)
    // const res = path.get('body')
    // console.log("res", res)
    // console.log("res.node", res.node.type)

    // 处理接收到的options
    const ifMemberExpression = dealOptions(state.opts)


    let node = path.node
    // console.log("path.node", node)
    let id = node.id
    let funcName = node.id.name  //函数名
    // console.log("node.id", funcName)
    let params = node.params // 函数参数
    // console.log("node.params", params)
    let wrapperBody = node.body //函数包裹
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
    let consequent = t.blockStatement(node.body.body)
    // else作用域块
    let alternate = t.blockStatement(node.body.body)
    // 箭头函数体
    let newArrowFunctionBody = t.blockStatement([t.ifStatement(test, consequent, alternate)])
    // 箭头函数
    let newArrowFunction = t.arrowFunctionExpression(params, newArrowFunctionBody, async)

    path.replaceWith(newArrowFunction)


    // path.replaceWith(
    //   t.ifStatement(test, consequent, alternate)
    // )

    path.stop()
  },
  IfStatement(path, state) {
    let options = state.opts

    const node = path.node
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