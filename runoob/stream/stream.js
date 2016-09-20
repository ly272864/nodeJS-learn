// 引入 fs 模块;
var fs = require("fs");
var data = "";

// 从流中读取数据
function read() {

	// 创建可度流;
	var readerStream = fs.createReadStream("input.txt");

	// 设置编码为 utf8
	readerStream.setEncoding("UTF8");

	// 处理流事件 ——> data, end, and error
	readerStream.on("data", function(chunk){
		data += chunk;
	});

	readerStream.addListener("end", function(){
		console.log(data);
	});

	readerStream.once("error", function(err){
		console.log(err.stack);
	});
}
// read();

// 写入流
function writer() {
	
	data = "菜鸟教程官网地址:www.runoob.com";
	
	// 创建一个可以写入的流，写入到文件 output.txt 中;
	var writerStream = fs.createWriteStream("output.txt");

	// 使用 utf8 编码写入数据
	writerStream.write(data, "UTF8");

	// 标记文件末尾
	writerStream.end();

	// 处理流事件 ——> data, end, and error
	writerStream.on("finish", function(){
		console.log("写入完成");
	});

	writerStream.addListener("error", function(err){
		console.log(err.stack);
	});
}
// writer();

// 管道流;
function copyFile(){

	// 创建一个可读流
	var readerStream = fs.createReadStream("input.txt");

	// 创建一个可写流
	var writerStream = fs.createWriteStream("output.txt");

	// 管道读写操作
	// 读取 input.txt 文件内容, 并将内容写入到 output.txt 文件中
	readerStream.pipe(writerStream);
}
// copyFile();

// 链式流 ———— 压缩文件
function compression() {

	// 引入 zlib 模块;
	var zlib = require("zlib");

	// 压缩 input.txt 文件为 input.txt.gz
	fs.createReadStream("input.txt")
	.pipe(zlib.createGzip())
	.pipe(fs.createWriteStream("input.txt.gz"));
	
	console.log("文件压缩完成.");
}
// compression();

// 链式流 ———— 文件解压缩
function unzip() {

	// 引入 zlib 模块;
	var zlib = require("zlib");

	fs.createReadStream("input.txt.gz")
	.pipe(zlib.createGunzip())
	.pipe(fs.createWriteStream("input.txt"));

	console.log("文件解压缩成功");
}
unzip();

console.log("\n"+"程序执行完毕");


