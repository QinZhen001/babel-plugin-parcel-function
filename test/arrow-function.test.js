const {testPlugin, removeSpace} = require("./util/util")

const code1 = `async () => {
    await aaa();
  };
`

const code2 = `
const success = (res) => {
    console.log(res, '跳转成功');
    return true
  }
`


// -------------------------------------------

describe("箭头函数", () => {
  test("匿名", () => {
    const res = testPlugin(code1, [], [], {})
    expect(res).toMatchSnapshot();
  })
  test("赋值", () => {
    const res = testPlugin(code2, [], [], {})
    expect(res).toMatchSnapshot();
  })
})


