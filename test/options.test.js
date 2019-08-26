const {testPlugin} = require("./util/util")

const code = `function f(aa,bb) {
    let asd = 1 
    asd = aa + bb
    console.log("aaa")
  }
`


describe("测试插件参数", () => {
  test("参数为数组", () => {
    const result = testPlugin(code, [], [], {
      globalName: ["aaa", "bbb", "ccc", "ddd"]
    })
    // console.log("result", result)
  })
  test("参数字符串", () => {
    const result = testPlugin(code, [], [], {
      globalName: "aaa.bbb.ccc"
    })
    // console.log("result", result)
  })
  test("空参数", () => {
    const result = testPlugin(code, [], [])
    // console.log("result", result)
  })
})


