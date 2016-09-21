var fs = require("fs");

var readStream = fs.createReadStream("1.MP4");
var writeStream = fs.createWriteStream("1-stream.MP4");

readStream
	.on("data", function(chunk) {
		// 判断数据还在缓存区
		if(writeStream.write(chunk) === false) { 
			console.log("still cached");
			// 数据读取暂停
			readStream.pause();
		}
	})
	.on("end", function(){
		writeStream.end();
	});

// 数据已写入目标
writeStream.on("drain", function() {
	console.log("data drain");
	// 继续读取数据
	readStream.resume();
})
