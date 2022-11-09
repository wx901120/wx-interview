let express = require('express')
let app = express()
// 中间件：
app.use(express.static(__dirname))

app.listen(4000)