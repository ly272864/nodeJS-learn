// 创建长度为256字节的buffer实例;
// var buf = new Buffer(256);

// // 写入缓存区
// var len = buf.write("www.runoob.com");

// console.log("\n"+"写入字节数: "+ len);

// var buf = new Buffer(26);
// var len = buf.length;

// for(var i = 0; i < len; i++) {
// 	buf[i] = i + 97;
// }

// console.log(buf);

// console.log(buf.toString("ascii"));
// console.log(buf.toString("ascii", 0, 5));
// console.log(buf.toString("utf8", 0, 5));
// console.log(buf.toString(undefined, 0, 5));

// // 将buffer转换为json对象
// var buf = new Buffer("www.runoob.com");
// var json = buf.toJSON(buf);

// console.log(json);

// // 缓存区合并
// var buffer1 = new Buffer("菜鸟教程");
// var buffer2 = new Buffer("www.runoob.com");
// var buffer3 = Buffer.concat([buffer1, buffer2]);
// console.log("buffer3内容:" + buffer3.toString());


// // 缓存区比较
// var buffer1 = new Buffer("ABC");
// var buffer2 = new Buffer("ABCD");
// var result = buffer1.compare(buffer2);

// if(result < 0) {
// 	console.log(buffer1 + "在" + buffer2 + "之前");
// } else if(result == 0) {
// 	console.log(buffer1 + "与" + buffer2 + "相同");
// } else {
// 	console.log(buffer1 + "在" + buffer2 + "之后");
// }


// // 拷贝缓存区
// var buffer1 = new Buffer("ABC");
// var buffer2 = new Buffer(3);
// buffer1.copy(buffer2);
// console.log("buffer2 content: " + buffer2.toString());


// 缓存区裁剪
var buffer1 = new Buffer("runoob");
var buffer2 = buffer1.slice(0,2);
console.log("buffer2 content: " +buffer2.toString());

console.log("\n"+"程序执行over");


