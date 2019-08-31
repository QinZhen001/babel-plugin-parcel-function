const {testPlugin, removeSpace} = require("./util/util")

const code1 = `
async function f() {
    await aaa();
    await bbb();
    console.log('eee');
    return 'ddd';
  }
`


const code2 = `
const test = async function(aaa,bbb) {
    await aaa();
    await bbb();
  }
`

// --------------------------------------

describe("普通函数", () => {
  test("async函数", () => {
    const res = testPlugin(code1, [], [], {
      prefixName: ["aaa", "bbb", "ccc", "ddd"]
    })
    expect(res).toMatchSnapshot();
  })
  test("赋值", () => {
    const res = testPlugin(code2, [], [], {})
    expect(res).toMatchSnapshot();
  })
})


