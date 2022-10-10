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
}

// debugger
console.log('1');
const p1 = new MyPromise((resolve, reject) => {
    console.log('2');
    resolve('c')
    console.log('5');
})
p1.then(val => {
    console.log(3);
})
console.log(4);


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