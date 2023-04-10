function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        reject(new TypeError('不能循环调用，即then中返回的还是自己'))
    }
    if (x instanceof MyPromise) {
        x.then(resolve, reject)
    } else {
        // 说明x是普通值
        resolve(x)
    }
}
class MyPromise {
    PENDING = 'PENDING'
    RESOLVED = 'RESOLVED'
    REJECT = 'REJECT'
    constructor(fn) {
        this.status = this.PENDING // 维护一个状态
        this.value = undefined
        this.reason = undefined
        this.resolveCallbacks = []
        this.rejectCallbacks = []
        try {
            // 因为执行fn的时候可能会有报错
            fn(this.resolve.bind(this), this.reject.bind(this)) // this指向要指定的,为什么？因为在默认情况下，使用 setTimeout() 时，this 关键字会指向 window（或 global）对象
        } catch (error) {
            this.reject(error)
        }
    }
    // 静态方法
    static resolve(params) {
        if (params instanceof MyPromise) {
            return params
        }
        return new MyPromise(resolve => {
            resolve(params)
        })
    }
    static reject(params) {
        return new MyPromise((resolve, reject) => {
            reject(params)
        })
    }
    // 也可以使用箭头函数resolve，reject，这样上面就可以直接调用了，不用bind了
    // resolve = ()=>{}
    // reject = ()=>{}
    resolve(val) {
        // resolve和reject是一个异步任务
        // 因为promise的状态只能是从pending=》resolved/reject,所以一旦执行了resolve或者reject，那么它的状态也要改变
        if (this.status === this.PENDING) {
            this.status = this.RESOLVED
            this.value = val
            this.resolveCallbacks.forEach(fn => fn(this.value))
        }
    }
    reject(val) {
        if (this.status === this.PENDING) {
            this.status = this.REJECT
            this.reason = val
            this.rejectCallbacks.forEach(fn => fn(this.reason))
        }
    }
    then(onfulfilled, onrejected) {
        // 如果不传，则使用默认函数
        onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : value => value
        onrejected =
            typeof onrejected === 'function'
                ? onrejected
                : reason => {
                      throw reason
                  }

        const promise2 = new MyPromise((resolve, reject) => {
            // 执行then的时候promise的状态有可能是三种状态
            // 1. 这种就是有异步的情况，异步导致当前的状态还是pending
            if (this.status === this.PENDING) {
                this.resolveCallbacks.push(() => {
                    queueMicrotask(() => {
                        try {
                            const x = onfulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                })
                this.rejectCallbacks.push(() => {
                    queueMicrotask(() => {
                        try {
                            const x = onrejected(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                })
            }
            if (this.status === this.RESOLVED) {
                // 这里为什么要用queueMicrotask？
                // 因为要等promise2初始化之后传入才不会报错
                queueMicrotask(() => {
                    try {
                        // 获取成功回调的执行结果,这个x可能还是promise哦
                        const x = onfulfilled(this.value)
                        // 统一通过resolvePromise处理
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if (this.status === this.REJECT) {
                queueMicrotask(() => {
                    try {
                        const x = onrejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
        })
        return promise2
    }
    catch(cb) {
        return this.then(null, cb)
    }
    finally(cb) {
        return this.then(
            value => {
                return Promise.resolve(cb()).then(() => {
                    return value
                })
            },
            err => {
                return Promise.resolve(cb()).then(() => {
                    throw err
                })
            }
        )
    }
    // 有一个失败了就失败了，全部成功返回成功的结果
    all(promiseList = []) {
        return new Promise((resolve, reject) => {
            if (!Array.isArray(promiseList)) {
                return reject('传入的参数必须是数组')
            }

            let result = []
            let count = 0 // 计数器
            for (let i = 0; i < promiseList.length; i++) {
                Promise.resolve(promiseList[i])
                    .then(res => {
                        count++
                        result[i] = res
                        // 不能直接通过 result.length 进行比较，因为 会存在下标大的先赋值
                        // 例如 i = 3 第一个返回结果，此时数组变为[empty,empty,empty,res]
                        if (count === promiseList.length) {
                            resolve(result)
                        }
                    })
                    .catch(e => {
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
                Promise.resolve(promiseList[i])
                    .then(res => {
                        resolve(res)
                    })
                    .catch(e => {
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
                Promise.resolve(promiseList[i])
                    .then(res => {
                        // count++
                        // ans[i] = {
                        //     status: 'fulfilled',
                        //     value: res
                        // }
                        fn(i, { status: 'fulfilled', value: res })
                    })
                    .catch(e => {
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
                Promise.resolve(promiseList[i])
                    .then(res => {
                        resolve(res)
                    })
                    .catch(e => {
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

// 面试题1
// Promise.resolve()
//     .then(function () {
//         console.log('promise0')
//     })
//     .then(function () {
//         console.log('promise5')
//     })
//     .then(function () {
//         console.log('aa')
//     })
// setTimeout(() => {
//     console.log('timer1')
//     Promise.resolve().then(function () {
//         console.log('promise2')
//     })
//     Promise.resolve().then(function () {
//         console.log('promise4')
//     })
// }, 0)
// setTimeout(() => {
//     console.log('timer2')
//     Promise.resolve().then(function () {
//         console.log('promise3')
//     })
// }, 0)
// Promise.resolve()
//     .then(function () {
//         console.log('promise1')
//     })
//     .then(function () {
//         console.log('b')
//     })
// console.log('start')

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

// 面试题2(简单)
// async function async1() {
//     console.log('async1 start')
//     await async2() // Promise.resolve().then(()=>{ console.log('async1 end') })
//     console.log('async1 end')
//   }
//   async function async2() {
//     console.log('async2')
//   }
//   console.log('script start')
//   setTimeout(() => {
//     console.log('setTimeout')
//   }, 0)
//   async1()
//   new Promise((resolve) => {
//     console.log('promise1')
//     resolve()
//   }).then(() => {
//     console.log('promise2')
//   })
//   console.log('script end')

// 微：[]
// 宏：[]
//script start
// async1 start
//async2
//promise1
//   script end
// async1 end
// promise2
// setTimeout

// 面试题3(只有执行了resolve才会去执行.then放入微任务中)
// console.log('start')
// setTimeout(() => {
//   console.log('children2')
//   Promise.resolve().then(() => {
//     console.log('children3')
//   })
// }, 0)

// new Promise((resolve, reject) => {
//   console.log('children4')
//   setTimeout(() => {
//     console.log('children5')
//     resolve('children6') //
//   }, 0)
// }).then((res) => {
//   console.log('children7')
//   setTimeout(() => {
//     console.log(res)
//   }, 0)
// })

// 微：[]
// 宏：【 ]
// start
// children4
// children2
// children3
// children5
// children7
// children6

// let p = new Promise((resolve, reject) => {
//     resolve('a')
// })
//     .then(
//         value => {
//             console.log(value)
//             throw '错误了'
//         },
//         reason => {
//             console.log(reason)
//         }
//     )
//     .catch(reason => {
//         console.log('catch:', reason)
//     })

// 面试题(不太懂)
Promise.resolve()
    .then(() => {
        console.log(0)
        return Promise.resolve(4)
    })
    .then(res => {
        console.log(res)
    })

Promise.resolve()
    .then(() => {
        console.log(1)
    })
    .then(() => {
        console.log(2)
    })
    .then(() => {
        console.log(3)
    })
    .then(() => {
        console.log(5)
    })
    .then(() => {
        console.log(6)
    })
// 微：
// 宏：
// 0，1，2,3,4,5,6
