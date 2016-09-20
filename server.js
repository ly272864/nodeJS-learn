// 引入http模块;
var http = require("http");

// 创建一个服务并在8888端口监听
http.createServer(function (request, response){

	console.log("发送http请求");

	response.writeHead(200, {"content-type": "text/plain"});

	// 写入
	response.write("Hello NodeJS!!");

	console.log("相应请求并返回");

	response.end();

}).listen(8888);

console.log("http://192.1638.31.102:8888");