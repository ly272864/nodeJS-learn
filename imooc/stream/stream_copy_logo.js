// 通过流来处理图片

var fs = require("fs");
var sourse = fs.readFileSync("../buffer/logo.png");

fs.writeFileSync("stream_copy_logo.png", sourse)
