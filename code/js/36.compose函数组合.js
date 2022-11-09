/**
 * 将一系列函数，通过compose函数组合起来，像管道一样连接起来，比如函数组合[f, g, h ]，通过compose最终达到这样的效果： f(g(h()))
 * compose函数要求：可执行同步方法，也可执行异步方法，两者都可以兼容
 * compose可以把类似于f(g(h(x)))这种写法简化成compose(f, g, h)(x)
 */
// 函数式编程
// 先执行Promise.resolve(init.apply(null, args))

/**
 * demo
 */
const add1 = (x) => x + 1;
const mul3 = (x) => x * 3;
const div2 = (x) => x / 2;
div2(mul3(add1(add1(0)))); //=>3
// 将上面这种形式转化为下面这种
//  const operate = compose(div2, mul3, add1, add1)
// operate(0) //=>相当于div2(mul3(add1(add1(0)))) 
// operate(2) //=>相当于div2(mul3(add1(add1(2))))

// 1. redux源码的写法：学习了，支持不定参数,从右向左
function _composeByRight(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((pre, cur) => (...args) => pre(cur(...args)))
}
const oprate = _composeByRight(div2, mul3, add1, add1)
console.log(oprate(1));


// 2. 支持promise异步的方案：从左向右
function compose(funcs) {
  if (funcs.length === 0) {
    return args => args
  }
  if (funcs.length === 1) {
    return args => Promise.resolve(funcs[0](args))
  }
  // 上面是边界条件处理
  let first = funcs.shift()
  return (...args) => {
    return funcs.reduce((pre, cur) => {
      return pre.then(res => {
        return cur(res)
      })
    }, Promise.resolve(first(...args)))
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

// 异步方法案例
let async1 = data => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("async1");
      resolve(data);
    }, 2000);
  });
};
let async2 = data => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("async2");
      resolve(data + 1);
    }, 1000);
  });
};
let async3 = data => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("async3");
      resolve(data + 2);
    }, 1000);
  });
};
let asyncFn = compose([async1, async2, async3]);
asyncFn(0).then(res => {
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
