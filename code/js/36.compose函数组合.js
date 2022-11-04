/**
 * 将一系列函数，通过compose函数组合起来，像管道一样连接起来，比如函数组合[f, g, h ]，通过compose最终达到这样的效果： f(g(h()))
 * compose函数要求：可执行同步方法，也可执行异步方法，两者都可以兼容
 */
// 函数式编程
// 先执行Promise.resolve(init.apply(null, args))
// 不好理解
function compose(list) {
  debugger
  const init = list.shift()
  return function (...args) {
    return list.reduce((pre, cur) => {
      return pre.then(res => {
        return cur.call(null, res)
      })
    }, Promise.resolve(init.apply(null, args)))
  }
}
// 同步方法案例
let sync1 = data => {
  console.log("sync1");
  return data;
};
let sync2 = data => {
  console.log("sync2");
  return data + 1;
};
let sync3 = data => {
  console.log("sync3");
  return data + 2;
};
let syncFn = compose([sync1, sync2, sync3]);
syncFn(0).then(res => {
  console.log(res);
});

// 第二次
// function _compose(list) {
//   let first = list.shift()
//   return (...args) => {
//     return list.reduce((pre, cur) => {
//       return pre.then(res => {
//         return cur(res)
//       })
//     }, Promise.resolve(first(...args)))
//   }
// }
// let syncFn2 = _compose([sync1, sync2, sync3]);
// syncFn2(0)
//   .then(res => {
//     console.log(res);
//   });
