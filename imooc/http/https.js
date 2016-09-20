// 构建一个https服务器

// 引入https模块
var https = require('https');

// 引入文件模块
var fs = require('fs');

var options = {
	key: fs.readFileSync('ssh_kay.pem'),
	cert: fs.readFileSync('ssh_cert.pem')
}

https.createServer(options, function(req, res){
	res.writeHead(200);
	res.end("hello https!");
}).listen(8090);
