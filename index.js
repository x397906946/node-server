var http = require('http');
var path = require('path'); //自动读取路径
var fs = require('fs'); //自动读写文件
var url = require('url'); //自动解析url

function staticRoot(staticPath, req, res){
  //读取路径
  var pathObj = url.parse(req.url, true);
  if(pathObj.pathname === '/'){
    pathObj.pathname += 'test.html';
  }

  var filePath = path.join(staticPath, pathObj.pathname);

  fs.readFile(filePath, 'binary', function(err, fileContent){
    if(err){
      res.writeHead(404, 'not found');
      res.end('<h1>404 Not Found</h1>');
    }else{
      res.writeHead(200, 'OK');
      res.write(fileContent, 'binary');
      res.end();
    }
  });
}


//创建服务器
var server = http.createServer(function(req, res){
  staticRoot(path.join(__dirname, 'sample'), req, res);
});

//创建8080端口
server.listen(8080);