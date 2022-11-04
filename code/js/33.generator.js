/**
 * 
 */
async function getResult() {
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
            console.log(1);
        }, 1000);
    })
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(2);
            console.log(2);
        }, 3000);
    })
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(3);
            console.log(3);
        }, 100);
    })

}
// getResult()// 1 2 3


function* getResult2() {
    yield new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1)
            console.log(1)
        }, 1000);
    })
    yield new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(2)
            console.log(2)
        }, 1000);
    })
    yield new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(3)
            console.log(3)
        }, 1000);
    })
}
const gen = getResult2()
// gen.next().value.then(res=>{
//     gen.next().value.then(res=>{
//         gen.next().value
//     })
// })
// 将gen.next封装一层
// 本质还是递归跟上面差不多
function co(gen) {
    let g = gen.next()
    // 最后一个done为true
    while (g.done) {
        return
    }
    g.value.then(res => {
        co(gen)
    })
}
co(gen)
