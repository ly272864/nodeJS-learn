// 引入文件系统fs模块
var fs = require("fs");
// 创建可读的流
var readStream = fs.createReadStream("1.MP4");

var n = 0;

// 监听流的各种状态;
readStream
	.on("data", function(chunk) {
		n++;
		console.log("data emits");
		// 判断chunk是不是一个Buffer;
		console.log(Buffer.isBuffer(chunk));
		// console.log(chunk.toString("utf8"));
		
		// 暂停一个可读流
		readStream.pause();
		console.log("data pause");
		setTimeout(function(){
			console.log("data pause end");
			// 重新打开可读流
			readStream.resume();
		}, 10);
	})
	.on("readable", function() {
		console.log("data readable");
	})
	.on("end", function() {
		// 查看触发了多少次的data事件;
		console.log(n);
		console.log("data ends");
	})
	.on("close", function() {
		console.log("data close");
	})
	.on("error", function(e) {
		console.log("data read error" + e);
	});