const urls = Array.from({
    length: 10
}, (v, i) => `/api/test?num=${i}`)
// const timeout = (url,n) => new Promise(r => setTimeout(r(url), n))

const req = url => {
    return new Promise((resolve, reject) => {
        // 模拟网络请求
        setTimeout(() => {
            console.log(url);
            resolve(url)
        }, 1000);
    })
}
function sendRequestParallel(urls, max) {
    return new Promise(resolve => {
        const len = urls.length
        let ans = []
        let count = 0
        const start = () => {
            if(urls.length === 0) return
            while (max > 0) {
                const url = urls.shift()
                max--
                req(url).then(res => {
                    ans.push(res)
                    max++
                    count++
                    if (count === len) {
                        resolve(ans)
                    } else {
                        start()
                    }

                })
            }
        }
        start()
    })
}
sendRequestParallel(urls, 3).then(res=>{
    console.log(res);
});