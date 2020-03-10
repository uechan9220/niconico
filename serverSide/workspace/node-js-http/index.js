'use strict'
const http = require('http')
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain; charset-8'
  });
  res.write(req.headers['user-agent'])
  res.end()
})
const post = 8000
server.listen(port, () => {
  console.log('Listening on' + port)
})