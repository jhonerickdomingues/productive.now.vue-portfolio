const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, '/dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'))
})

var server = app.listen(process.env.PORT || 8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.info(`server start successfully on http://${host}:${port}`)
})
