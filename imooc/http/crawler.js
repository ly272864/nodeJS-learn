// 使用nodeJS做一个简单的小爬虫

// 引入http模块
var http = require("http");
// 引入cheerio模块
var cheerio = require("cheerio");
// 请求的url链接地址;
var url = "http://www.imooc.com/learn/348";

// 对请求回来的html数据结构进行分解提取
function filterChapters(html) {

	// 使用cheerio模块的load方法查找,类似于jquery;
	var $ = cheerio.load(html);
	var chapters = $(".chapter");

	// 存放生成的数据;
	var courseData = [];

	chapters.each(function(item){
		var chapter = $(this);
		var chapterTitle = chapter.find("strong").text();
		var videos = chapter.find(".video").children("li");
		var chapterData = {
			chapterTitle: chapterTitle,
			videos: []
		};

		videos.each(function(item){
			var video = $(this).find(".J-media-item");
			var videoTitle = video.text().split(" ").join("");
			var id = video.attr("href").split("video/")[1]

			chapterData.videos.push({
				title: videoTitle,
				id: id
			})
		});

		courseData.push(chapterData);	
	})
	
	return courseData;
}

// 拼接字符串;
function printCourseInfo(courseData) {
	courseData.forEach(function(item){
		var chapterTitle = item.chapterTitle;

		console.log(chapterTitle + "\n");

		item.videos.forEach(function(video) {
			console.log("【" + video.id + "】" + video.title + "\n");
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
