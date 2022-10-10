// https://www.bilibili.com/video/BV1DA411Y7Xe/?spm_id_from=333.788&vd_source=d2df264a2611386e093c543283cf2fde
// setTimeout(() => {
//     console.log('a');
// });

// 它并不是间隔ms就执行回调函数，而是间隔ms把回调函数放到队列里面，如果此时主执行栈没有其他任务在执行，那就会从队列里面拿出来一个开始执行
// setInterval(() => {
//     // for (let i = 0; i < 1000000000; i++) {

//     // }
//     console.log('b');
// }, 1000);


// 使用setTimeout实现setInterval
// 这种方式的优点是：只有当前一个cb执行完之后，才会将下一个放到队列里面，而不像setInterval，它是不管你上一个有没有执行完，都是每隔ms把它放到队列里面
function newInterval(cb, ms) {
    // 递归调用
    function inner() {
        cb()
        setTimeout(inner, ms);
    }
    // inner()
    setTimeout(inner, ms);

}
newInterval(like, 1000)

function like() {
    console.log('c');
}