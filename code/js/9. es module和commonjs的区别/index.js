// commonjs的方式
// const {count,add,getCount} = require('./a')
// console.log(count);    // 1
// add();
// console.log(count);    // 1
// console.log(getCount());    // 2

// es module的方式
import {count,add,getCount} from './a.js'
console.log(count);    // 1
add();
console.log(count);    // 2
console.log(getCount());    // 2









// const urls = Array.from({ length: 10 }, (v, i) => `/api/test/${i}`)
// // console.log(urls);

// async function runParallel(urls, maxNums) {
//     let ret = []
//     const executing = []
//     for (const item of urls) {
//         const p = Promise.resolve()
//         p.then(() => {
//             for (let i = 0; i < 100000000; i++) {
//             }
//             console.log(item);
//         })
//         ret.push(p)

//         p.then(()=>{
            
//         })

//         // if (maxNums <= urls.length) {
//         //     const e = p.then(() => executing.splice(executing.indexOf(e), 1))
//         //     executing.push(e)
//         //     if (executing.length >= maxNums) {

//         //         await Promise.race(executing)
//         //         console.log('三个');
//         //     }
//         // }
//     }
//     return Promise.all(ret)
// }
// console.log(runParallel(urls, 3));


// // const urls = Array.from({
// //     length: 10
// // }, (v, i) => `/api/test?num=${i}`)

// // const req = url => {
// //     return new Promise((resolve, reject) => {
// //         resolve(url)
// //     })
// // }

// // const multiRequest = (urls, maxNum) => {
// //     return new Promise((resolve, reject) => {
// //         let stackIndex = 0
// //         let resList = []
// //         const next = () => {
// //             if (urls.length === 0) return //结束条件
// //             let path = urls.shift()
// //             stackIndex++
// //             console.log(path,'开始');
// //             req(path).then(res => {
// //                 resList.push(res)
// //                 console.log(res,'结束');
// //                 // 进到这里书面肯定有一个执行完了，需要继续开始下一个
// //                 stackIndex--
// //                 if (stackIndex === 0 && urls.length === 0) {
// //                     resolve(resList)
// //                 } else {
// //                     next()

// //                 }
// //             })
// //         }
// //         // 这个只在第一轮有效
// //         while (stackIndex < maxNum) {
// //             next()
// //         }
// //     })

// // }
// // multiRequest(urls, 3).then(res => {
// //     console.log(res);
// // })