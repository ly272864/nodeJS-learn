var http = require("http");

http.createServer(function(request, response){

	// 发送 http 头部
	// http 状态值: 200 : OK
	// 内容类型: text/plain
	response.writeHead(200, {'Content-Type': 'text/plain'})

	response.end("hello world\n");

}).listen(8888);

console.log("server running at http://127.0.0.1:8888" +"\n"+ "正在学习nodeJS!");