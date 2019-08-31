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
      prefixName: ["aaa", "bbb", "ccc", "ddd"]
    })
    expect(result).toMatchSnapshot();
  })
  test("参数字符串", () => {
    const result = testPlugin(code, [], [], {
      prefixName: "aaa.bbb.ccc"
    })
    expect(result).toMatchSnapshot();
  })
  test("addFileName", () => {
    const result = testPlugin(code, [], [], {
      addFileName: true
    })
    expect(result).toMatchSnapshot();
  })
})


