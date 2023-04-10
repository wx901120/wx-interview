// commonjs的方式:值传递
// const {count,add,getCount} = require('./a')
// console.log(count);    // 1
// add();
// console.log(count);    // 1
// console.log(getCount());    // 2

// es module的方式：引用传递
import {count,add,getCount} from './a.js'
console.log(count);    // 1
add();
console.log(count);    // 2
console.log(getCount());    // 2
