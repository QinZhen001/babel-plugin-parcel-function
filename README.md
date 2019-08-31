# babel-plugin-parcel-function

[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)
[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)


一个使用if-else包裹增强函数的babel插件


不影响原函数的使用，可以在if中注入一些黑科技方法


----


A babel plugin that uses the if-else package enhancement function

Does not affect the use of the original function, you can inject some black technology method in ifStatement


## Install

```
npm install --save-dev babel-plugin-parcel-function
```


## Usage

.babelrc
```
{
  "plugins": 
     [
          ["babel-plugin-parcel-function",
            {
              prefixName: "global.hotUpdate",
              addFileName: false
            }
          ]
        ]
}
```




## Examples  


```javascript
async function f(arg) {
    await aaa();
    await bbb();
    console.log('eee');
    return 'ddd';
  }
```

转换后



```javascript
async function f(arg) {
    if (global.hotUpdate.f) {
        global.hotUpdate.f.call(this,arg);
    } else {
        await aaa();
        await bbb();
        console.log('eee');
        return 'ddd';
    }
}
```




### Options



| name        | description              | type         | default            |
| ----------- | ------------------------ | ------------ | ------------------ |
| prefixName  | if判断和if块中的前缀      | String|Array | "global.hotUpdate" |
| addFileName | 是否将文件名添加到前缀中 | Boolean      | false              |



when Options

```
{
       prefixName: "aaa.bbb.ccc",
       addFileName: false
}
```


code 

```javascript
function f(aa,bb) {
    let asd = 1 
    asd = aa + bb
    console.log("aaa")
  }
```


after transform

```javascript
function f(aa, bb) {
    if (aaa.bbb.ccc.f) {
        aaa.bbb.ccc.f.call(this, aa, bb);
    } else {
        let asd = 1;
        asd = aa + bb;
        console.log("aaa");
    }
}
```


**if中的判断和if块中的代码由  [prefixName + fileName + 函数名]  决定**






