/**
 * asyncPool (poolLimit,arr,iteratorFn)
 */
/**
 * Promise.resolve().then(() => iteratorFn(item, arr))
 * const a = Promise.resolve().then()
 * a.then(()=>{
 *  iteratorFn(item, arr)
 * })
 */

/**
 * 跟18是同一道题，不过这个写法更高端，还要研究研究
 * @param {*} poolLimit 并发数
 * @param {*} arr 任务数组
 * @param {*} iteratorFn 迭代函数
 */
async function asyncPool(poolLimit, arr, iteratorFn) {
    const res = []
    const len = arr.length // 任务总个数
    const executing = []; // 存储正在执行的异步任务
    for (const item of arr) {
        const p = Promise.resolve().then(() => iteratorFn(item, arr))
        res.push(p)
        if (poolLimit <= len) {
            // 当任务完成后，从正在执行的任务数组中移除已完成的任务
            const e = p.then(() => executing.splice(executing.indexOf(e), 1));
            executing.push(e); // 保存正在执行的异步任务
            if (executing.length >= poolLimit) {
                await Promise.race(executing); // 等待较快的任务执行完成
            }
        }
    }
    return Promise.all(res)
}
// 其实就是一个模拟请求的promise
const timeout = i => new Promise(resolve => {
    setTimeout(() => {
        console.log(i);
        resolve(i)
    }, 1000);
})
const urls = Array.from({
    length: 10
}, (v, i) => `/api/test?num=${i}`)
asyncPool(3, urls, timeout).then(res => {
    console.log(res);
})
