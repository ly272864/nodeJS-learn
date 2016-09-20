// 技术灌水CSDN评论
// 注：慎运行

var http = require("http");
var querystring = require("querystring");

var postData = querystring.stringify({
	"commentid": "",
	"content": "能写点优质内容么？？？",
	"replyId": ""
});

var options = {
	hostname: "blog.csdn.net",
	port: 80,
	path: "/ly272864318/comment/submit?id=49496005",
	method: "POST",
	headers: {
		"Accept": "*/*",
		"Accept-Encoding": "gzip, deflate",
		"Accept-Language": "zh-CN,zh;q=0.8",
		"Connection": "keep-alive",
		"Cache-Control": "private",
		"Content-Length": postData.length,
		"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
		"Cookie": "bdshare_firstime=1467086020018; uuid_tt_dd=-2066228819515781693_20160628; lzstat_uv=39373978152690958202|3608499; __message_district_code=440000; Hm_lvt_6bcd52f51e9b3dce32bec4a3997715ac=1474361014; Hm_lpvt_6bcd52f51e9b3dce32bec4a3997715ac=1474361014; _gat=1; _ga=GA1.2.477023034.1468480737; _message_m=ix5r2es2ksg4e2n5hqpbh14y; UserName=ly272864318; UserInfo=8BQFqG8nFUOqpViWQN2WyghUSYMMe1mM4pi3k8O5OT0we%2BIfB120Et5%2FenAw395lJiMRCF7zJ8eRpnOKHcsR6Syq7j8Nb%2BUIA7dj4lfz%2BSR0whYjmJsqtCaSNqDgKolNRD8CsP1rKAAuiP036al2nw%3D%3D; UserNick=%E7%94%A9%E7%94%A92728; AU=5D1; UD=web%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%B8%88; UN=ly272864318; UE='272864318@qq.com'; BT=1474361299186; access-token=330bfe6f-c479-4003-8c82-363bc4f8239a; uuid=8bc3e99f-c48d-48e4-a5fd-1bdcb7d7dda2; avh=49496005; dc_tos=odsoh6; dc_session_id=1474361170560; __message_sys_msg_id=0; __message_gu_msg_id=0; __message_cnel_msg_id=0; __message_in_school=0",
		"Host": "blog.csdn.net",
		"Origin": "http://blog.csdn.net",
		"Referer": "http://blog.csdn.net/ly272864318/article/details/49496005",
		"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36",
		"X-Requested-With": "XMLHttpRequest"
	}
};

var req = http.request(options, function(res){
	console.log("Status: " + res.statusCode);
	console.log("headers: " + JSON.stringify(res.headers));

	res.on("data", function(chunk){
		console.log(Buffer.isBuffer(chunk));
		console.log(typeof chunk);
	});

	res.on("end", function(){
		console.log("评论完毕!")
	})

	res.on("error", function(e){
		console.log("Error: " + e.message);
	})
});

req.write(postData);
req.end();

