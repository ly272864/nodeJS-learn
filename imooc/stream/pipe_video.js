// 使用pipe读写文件

var fs = require("fs");

fs.createReadStream("1.MP4").pipe(fs.createWriteStream("1-pipe.MP4"));

