var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method





if(path ===  '/'){
  response.statusCode = 200
  var a = fs.readFileSync('./index.html','utf-8')
  var amount = fs.readFileSync('./db','utf-8')
  a = a.replace('&&&amount&&&',amount)
  response.setHeader('Content-Type','text/html;charset = utf-8')
  response.write(a)
  response.end()
}else if(path === '/style'){
  response.statusCode = 200
  response.setHeader('Content-Type','text/css;utf-8')
  response.end('span{color:red;}')
}else if(path ==='/pay'){
  var amount = fs.readFileSync('./db','utf-8')
  var newAmount = amount -1
  fs.writeFileSync('./db',newAmount)
  response.statusCode =200
  response.setHeader('Context-Type','text/javascript')
  response.end(`${query.callback}.call(undefined,'success')`)
}




















})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)


