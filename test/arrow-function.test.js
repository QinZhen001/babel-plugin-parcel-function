const {testPlugin, removeSpace} = require("./util/util")

const code1 = `async () => {
    await aaa();
  };
`


const code2 = `async function f(aaa,bbb) {
    await aaa();
    await bbb();
  }
`

// --------------------------------------


const result1 = ` async function f() {
          if (aaa.bbb.ccc.ddd) {
              aaa.bbb.ccc.ddd();
          } else {
              await aaa();
              await bbb();
              console.log('eee');
              return 'ddd';
          }
      }
`

const result2 = `async function f(aaa, bbb) {
          if (aaa.bbb.ccc.ddd) {
              aaa.bbb.ccc.ddd(aaa, bbb);
          } else {
              await aaa();
              await bbb();
          }
      }
`


// -------------------------------------------

describe("箭头函数", () => {
  test("无参数", () => {
    const res = testPlugin(code1, [], [], {
      globalName: ["aaa", "bbb", "ccc", "ddd"]
    })
    console.log("result", res)
    // expect(removeSpace(res)).toEqual(removeSpace(result1))
  })
  test("有参数", () => {
    const res = testPlugin(code2, [], [], {
      globalName: ["aaa", "bbb", "ccc", "ddd"]
    })
    // console.log("result", res)
    // expect(removeSpace(res)).toEqual(removeSpace(result2))
  })
})


