const {testPlugin} = require("./util/util")

const code = `function f(aa,bb) {
    console.log("aaa")
  }

  function f1() {
    let a = 1
    a++
    console.log(a)
  }

  function f2(a, b) {
    return a + b
  }
`


describe("test plugin", () => {
  test("plugin", () => {
    const result = testPlugin(code, [], [], {
        globalName: ["aaa", "bbb", "ccc", "ddd"]
      })
    ;
    console.log("result", result)
    // expect(result).toEqual("const code = 3;")
  })
})


