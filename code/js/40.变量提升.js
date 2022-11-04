/**
 * 1. 函数提升比变量提升优先级高
 */
// var test;
// console.log(test) // funtion test()
// function test() {
//     console.log('a')
// }
// console.log(test) // funtion test()

/**
 * 2. 但是，会被变量的赋值给覆盖掉
 */

 var test = 10; // 赋值操作
 console.log(test) // 10
 function test() {
     console.log('a')
 }
 console.log(test) // 10