let express = require('express')
let app = express()

app.get('/search', function (req, res) {
    let { wd, cb } = req.query
    res.setHeader('Content-Type','text/plain; charset=UTF-8')
    res.end(`${cb}('我也爱你')`)
})

app.listen(3000)