let express = require('express')
let app = express()

let white_list = ['http://localhost:3000']
// 通过中间件控制是否往下走
app.use(function (req, res, next) {
    console.log(req.headers);
    let origin = req.headers.origin
    if (white_list.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin)
        res.setHeader('Access-Control-Allow-Headers', ['name'])
        res.setHeader('Access-Control-Allow-Methods', ['PUT'])
        res.setHeader('Access-Control-Allow-Max-Age', 6) // 表示预检请求的返回可以缓存多久（单位：秒）
        res.setHeader('Access-Control-Allow-Credentials', true)// 容许携带凭证，如cookie
        res.setHeader('Access-Control-Expose-Headers',['wx']) // 不容许写*了，需要写具体的
        if (req.method === 'OPTIONS') {// 预检请求什么都不做
            res.end()
        }
    }
    next()
})
app.get('/getData', function (req, res) {
    // req.headers的内容
    // {
    //     host: 'localhost:4000',
    //     connection: 'keep-alive',
    //     'sec-ch-ua': '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
    //     'sec-ch-ua-mobile': '?0',
    //     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
    //     'sec-ch-ua-platform': '"macOS"',
    //     accept: '*/*',
    //     origin: 'http://localhost:3000',
    //     'sec-fetch-site': 'same-site',
    //     'sec-fetch-mode': 'cors',
    //     'sec-fetch-dest': 'empty',
    //     referer: 'http://localhost:3000/',
    //     'accept-encoding': 'gzip, deflate, br',
    //     'accept-language': 'zh-CN,zh;q=0.9'
    //   }
    res.setHeader('wx','love')
    res.send('我爱你')
})
app.put('/getData', (req, res) => {
    res.end('我爱你')
})
app.listen(4000)