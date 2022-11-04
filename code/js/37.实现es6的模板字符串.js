let name1 = 'wx'
age = 18
let str = `我是${name1},今年${age}`

function templateStr(str) {
    return str.replace(/\$\{(.*?)\}/g, function (str, k) {
        return eval(k)
    })
}
console.log(templateStr(str));