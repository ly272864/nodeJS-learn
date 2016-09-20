// 使用nodeJS做一个简单的小爬虫获取慕课网的视频章节

// 引入http模块
var http = require("http");
// 引入cheerio模块用于解析后台的html
var cheerio = require("cheerio");
// 请求的url链接地址;
var url = "http://www.imooc.com/learn/348";

// 去除字符串空格
function trim(str) {
  return str.replace(/(^\s+)|(\s+$)/g, "");
}

// 对请求回来的html数据结构进行分解提取
function filterChapters(html) {

	// 使用cheerio模块的load装载html代码
	var $ = cheerio.load(html);
	// 使用$查找内容, 类似于jquery;
	var chapters = $(".chapter");

	// 存放生成的数据;
	var courseData = [];

	// 期望生成的数据结构
	// [{
	// 	chapterTitle: "",
	// 	videos: [
	// 		{
	// 			title: "",
	// 			id: ""
	// 		}
	// 	]
	// }]

	// // 使用each方法
	// chapters.each(function(item){
	// 	var chapter = $(this);
	// 	var chapterTitle = trim(chapter.find("strong").text()).split(/[\r\n]/g)[0];
	// 	var videos = chapter.find(".video").children("li");
	// 	var chapterData = {
	// 		chapterTitle: chapterTitle,
	// 		videos: []
	// 	};

	// 	videos.each(function(item){
	// 		var video = $(this).find(".J-media-item");
	// 		var videoTitle = trim(video.text()).split("(")[0];
	// 		var id = video.attr("href").split("video/")[1]

	// 		chapterData.videos.push({
	// 			title: videoTitle,
	// 			id: id
	// 		})
	// 	});

	// 	courseData.push(chapterData);	
	// })
	
	// 使用for循环
	for(var i = 0, leng = chapters.length; i < leng; i++) {

			// 每一章的标题并去除空格与换行;
		var chapterTitle = trim($(chapters[i]).find("strong").text()).split(/[\r\n]/g)[0],
			// 每一节的内容;
			videos = $(chapters[i]).find(".video").children("li"),
			// 生成一个存放章节的对象;
			chapterData = {
				chapterTitle: chapterTitle,
				videos: []
			};

		for(var j = 0, len = videos.length; j < len; j++) {

				// 获取每一个小节;
			var video = $(videos[j]).find(".J-media-item"),
				// 获取小节的标题;
				videoTitle = trim(video.text()).split("(")[0],
				// 获取小节的id;
				id = video.attr("href").split("video/")[1];

			chapterData.videos.push({
				title: videoTitle,
				id: id
			});
		}

		courseData.push(chapterData);
	}

	return courseData;
}

// 拼接字符串;
function printCourseInfo(courseData) {
	courseData.forEach(function(item){
		var chapterTitle = item.chapterTitle;

		console.log("\n"+ chapterTitle +"\n");

		item.videos.forEach(function(video) {
			console.log("     【" + video.id + "】" + video.title);
		});
	});
} 

// 通过get请求数据;
http.get(url, function(res) {
	var html = "";

	res.on("data", function(data){
		html += data;
	})

	res.on("end", function() {
		var courseData = filterChapters(html);

		printCourseInfo(courseData); 
	})

}).on("error", function() {
	console.log("获取数据出错!");
});
