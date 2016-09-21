// 加载http模块
var http = require("http");
// 加载文件模块
var fs = require("fs");
// 加载request模块
var request = require("request");

http.
	createServer(function(req, res) {
		// 通过fs模块读文件
		// fs.readFile("./buffer/logo.png", function(err, data) {
		// 	if(err) {
		// 		res.end("file not exist!")
		// 	}
		// 	else {
		// 		res.writeHeader(200, {"Context-Type": "text/html"})
		// 		res.end(data);
		// 	}
		// })
		

		// fs.createReadStream("../buffer/logo.png").pipe(res);

		request("http://static.mukewang.com/static/img/index/logo.png").pipe(res);

	}).listen(8090);
