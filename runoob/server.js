var http = require("http");

http.createServer(function (request, response) {
	
	console.log("发起请求");
	
	response.writeHead(200,{"Content-Type": "text/plain"});
	response.write("asdmasdm");
	response.end();

}).listen(888);

console.log("asdasd");