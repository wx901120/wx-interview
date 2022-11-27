class MyPromise {
    PENDING = 'PENDING'
    RESOLVED = 'RESOLVED'
    REJECT = 'REJECT'
    constructor(fn) {
        this.status = this.PENDING// 维护一个状态
        this.value = undefined
        this.reason = undefined
        this.resolveCallbacks = []
        this.rejectCallbacks = []
        try {// 因为执行fn的时候可能会有报错
            fn(this.resolve.bind(this), this.reject.bind(this)) // this指向要指定的
        } catch (error) {
            this.reject(error)
        }
    }
    resolve(val) {
        setTimeout(() => {// resolve和reject是一个异步任务
            // 因为promise的状态只能是从pending=》resolved/reject,所以一旦执行了resolve或者reject，那么它的状态也要改变
            if (this.status === this.PENDING) {
                this.status = this.RESOLVED
                this.value = val
                this.resolveCallbacks.forEach(fn => fn(this.value))
            }

        });
    }
    reject(val) {
        setTimeout(() => {
            if (this.status === this.PENDING) {
                this.status = this.REJECT
                this.reason = val
                this.rejectCallbacks.forEach(fn => fn(this.reason))
            }

        });
    }
    then(onfulfilled, onrejected) {
        return new MyPromise((resolve, reject) => {
            // 处理onfulfilled和onrejected的边界值
            onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : () => { }
            onrejected = typeof onrejected === 'function' ? onrejected : () => { }
            // 执行then的时候promise的状态有可能是三种状态
            if (this.status === this.PENDING) {
                this.resolveCallbacks.push(onfulfilled)
                this.rejectCallbacks.push(onrejected)
            }
            if (this.status === this.RESOLVED) {
                setTimeout(() => {// .then是个异步方法
                    onfulfilled(this.value)// 将成功的值返回
                });
            }
            if (this.status === this.REJECT) {
                setTimeout(() => {
                    onrejected(this.reason)
                });
            }

        })
    }
    // 有一个失败了就失败了，全部成功返回成功的结果
    all(promiseList = []) {
        return new Promise((resolve, reject) => {
            if (!Array.isArray(promiseList)) {
                return reject('传入的参数必须是数组')
            }

            let result = []
            let count = 0// 计数器
            for (let i = 0; i < promiseList.length; i++) {
                Promise.resolve(promiseList[i]).then(res => {
                    count++
                    result[i] = res
                    // 不能直接通过 result.length 进行比较，因为 会存在下标大的先赋值
                    // 例如 i = 3 第一个返回结果，此时数组变为[empty,empty,empty,res]
                    if (count === promiseList.length) {
                        resolve(result)
                    }
                }).catch(e => {
                    reject(e)
                })
            }
        })
    }
    // 竞速，返回第一个成功的或者失败的结果
    race(promiseList = []) {
        return new Promise((resolve, reject) => {
            if (!Array.isArray(promiseList)) {
                return reject('传入的参数必须是数组')
            }

            for (let i = 0; i < promiseList.length; i++) {
                Promise.resolve(promiseList[i]).then(res => {
                    resolve(res)
                }).catch(e => {
                    reject(e)
                })
            }
        })
    }
    // 无论成功或者失败都会返回
    allSettled(promiseList = []) {
        return new Promise((resolve, reject) => {
            let count = 0
            let ans = []
            const fn = (i, data) => {
                count++
                ans[i] = data
                if (count === promiseList.length) {
                    resolve(ans)
                }
            }
            for (let i = 0; i < promiseList.length; i++) {
                Promise.resolve(promiseList[i]).then(res => {
                    // count++
                    // ans[i] = {
                    //     status: 'fulfilled',
                    //     value: res
                    // }
                    fn(i, { status: 'fulfilled', value: res })

                }).catch(e => {
                    // count++
                    // ans[i] = {
                    //     status: 'rejected',
                    //     value: e
                    // }
                    fn(i, { status: 'rejected', value: e })
                })
            }
        })
    }
    // 和 Promise.all相反，有一个成功就返回成功，全部失败返回失败的结果数组
    any(promiseList) {
        return new Promise((resolve, reject) => {
            let count = 0
            let ans = []
            for (let i = 0; i < promiseList.length; i++) {
                Promise.resolve(promiseList[i]).then(res => {
                    resolve(res)
                }).catch(e => {
                    count++
                    ans[i] = e
                    if (count === promiseList.length) {
                        // AggregateError
                        reject(new AggregateError(ans))
                    }
                })

            }
        })
    }

}

// debugger
// console.log('1');
// const p1 = new MyPromise((resolve, reject) => {
//     console.log('2');
//     resolve('c')
//     console.log('5');
// })
// p1.then(val => {
//     console.log(3);
// })
// console.log(4);


// console.log('1');
// const p = new Promise((resolve, reject) => {
//     console.log('2');
//     resolve('c')
//     console.log('5');
// })
// p.then(val => {
//     console.log(3);
// })
// console.log(4);

// 面试题
Promise.resolve()
  .then(function() {
    console.log("promise0");
  })
  .then(function() {
    console.log("promise5");
  })
  .then(function(){
    console.log('aa');
  });
setTimeout(() => {
  console.log("timer1");
  Promise.resolve().then(function() {
    console.log("promise2");
  });
  Promise.resolve().then(function() {
    console.log("promise4");
  });
}, 0);
setTimeout(() => {
  console.log("timer2");
  Promise.resolve().then(function() {
    console.log("promise3");
  });
}, 0);
Promise.resolve().then(function() {
  console.log("promise1");
}).then(function(){
    console.log('b');
});
console.log("start");

// 微：[]
// 宏：[]
// start
// promise0
// promise1
// promise5
// b
// aa
// timer1
// promise2
// promise4
// timer2
// promise3

