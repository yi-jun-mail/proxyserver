let http = require('http')
let fs = require('fs')
let request = require('request')
let argv = require('yargs').argv

let logStream = argv.log ? fs.createWriteStream(argv.log) : process.stdout
let localhost = '127.0.0.1'
let scheme = 'http://'
let host = argv.host || localhost
let port = argv.port || (host === localhost ? 8000 : 80)
let destinationUrl = argv.url || scheme + host + ":" + port

let echoServer = http.createServer((req, res) => {
  logStream.write('echoServer\n')
  for (let header in req.headers) {
     res.setHeader(header, req.headers[header])
  }
  //logStream.write(JSON.stringify(req.headers)+'\n')
  req.pipe(logStream)
  req.pipe(res)
})

echoServer.listen(8000)
logStream.write('echo server listening @ 127.0.0.1:8000\n')

let proxyServer = http.createServer((req, res) => {
  logStream.write('proxyServer\n')
  logStream.write(JSON.stringify(req.headers) + '\n')
  let url = destinationUrl
  if (req.headers['x-destination-url']) {
    url = 'http://' + req.headers['x-destination-url']
  }

  let options = {
    url: url 
  }
 
  let outboundReq = request(options)
  req.pipe(logStream)
  let incomingRes = req.pipe(outboundReq)
  incomingRes.pipe(logStream)
  incomingRes.pipe(res)
  //req.pipe(request(options)).pipe(res)
  //res.pipe(logStream)
})

proxyServer.listen(9000)
logStream.write('proxy server listening @127.0.0.1:9000\n')
