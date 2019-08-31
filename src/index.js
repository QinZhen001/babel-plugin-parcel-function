const t = require("babel-types")
const {isString, isArray, getPathSuffix} = require("./util")

const DEFAULT_NAMES_ARRAY = ["global", "hotUpdate"]


function createMemberExpression(arr) {
  if (arr.length > 2) {
    let last = arr.pop()
    return t.memberExpression(createMemberExpression(arr), t.identifier(last))
  } else {
    return t.memberExpression(t.identifier(arr[0]), t.identifier(arr[1]))
  }
}


/**
 * 根据options和fileName生成memberExpression
 * @param{Object} options
 *      {Array|String} prefixName 前缀
 *      {Boolean} addFileName 是否加上文件名
 * @param{String} fileName
 * @returns {*}
 */
function dealOptions(options, fileName) {
  // console.log("options", options)
  let namesArr = DEFAULT_NAMES_ARRAY
  let globalName = options.prefixName
  if (globalName) {
    if (isString(globalName)) {
      namesArr = globalName.split(".")
    } else if (isArray(globalName)) {
      namesArr = globalName
    }
  }
  if (options.addFileName && fileName) {
    namesArr.push(fileName)
  }
  return createMemberExpression(namesArr)
}

const functionVisitor = {
  Function(path, state) {
    let node = path.node
    let id = node.id
    // 函数参数
    let params = node.params
    //函数主体
    let funcBody = node.body.body
    //是否是generator
    let generator = node.generator
    //是否是async
    let async = node.async

    let testExpression = id ? t.memberExpression(this.memberExpression, id) : this.memberExpression

    let finalCallMemberExpression = t.memberExpression(testExpression, t.identifier("call"))

    let finalCallParams = [t.thisExpression()]

    if (params) {
      finalCallParams = finalCallParams.concat(params)
    }

    // if作用域块
    let consequent = t.blockStatement([
      t.expressionStatement(t.callExpression(finalCallMemberExpression, finalCallParams))
    ])

    // else作用域块
    let alternate = t.blockStatement(funcBody)
    // 新的函数体
    let newFunctionBody = t.blockStatement([t.ifStatement(testExpression, consequent, alternate)])

    path.get("body").replaceWith(newFunctionBody)
  }
}


module.exports = function (babel) {
  return {
    name: "babel-plugin-parcel-function",
    pre(state) {
    },
    visitor: {
      Program(path, state) {
        // const scope = path.context.scope
        const options = this.opts
        const filename = this.file.opts.filename
        // console.log(options, filename)
        let memberExpression = dealOptions(options, getPathSuffix(filename))
        path.traverse(functionVisitor, {memberExpression})
      }
    },
    post(state) {
    }
  }
}