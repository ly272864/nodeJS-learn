// 使用nodeJS做一个简单的小爬虫获取慕课网的视频章节

// 引入http模块
var http = require("http");
// 引入Promise模块
var Promise = require("bluebird");
// 引入cheerio模块用于解析后台的html
var cheerio = require("cheerio");

// 请求的url链接地址;
var baseUrl = "http://www.imooc.com/learn/";
var videoIds = [/*"56.html", "38.html",*/ 637, 348, 259, 197, 134, 75];

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
	var title = $("#main h2").text();
	// 异步加载进来的拿不到学习人数
	var number = $(".js-learn-num").text();

	// 期望生成的数据结构
	// courseData = [{
	// 	title: title,
	// 	number: number,
	// 	videos:[{
	// 		chapterTitle: "",
	// 		videos: [
	// 			title: "",
	// 			id: ""
	// 		]
	// 	}]
	// }];
	
	// 存放生成的数据;
	var courseData = {
		title: title,
		number: number,
		videos:[]
	};

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

		courseData.videos.push(chapterData);
	}

	return courseData;
}

// 拼接字符串;
function printCourseInfo(coursesData) {

	coursesData.forEach(function(courseData) {

		console.log(courseData.number + " 人学过 " + courseData.title);
		
		console.log("========== " +courseData.title+ " ==========");
			
		courseData.videos.forEach(function(item){

			var chapterTitle = item.chapterTitle;

			console.log("\n"+ chapterTitle +"\n");

			item.videos.forEach(function(video) {
				console.log("     【" + video.id + "】" + video.title);
			});
		});
	});

} 

function getPageAsync(url) {
	return new Promise(function(resolve, reject){
		console.log("正在爬取 " + url);
	
		// 通过get请求数据;
		http.get(url, function(res) {
			var html = "";

			res.on("data", function(data){
				html += data;
			})

			res.on("end", function() {
				resolve(html);
			})

		}).on("error", function(e) {
			reject(e);
			console.log("获取数据出错!");
		});
	});
}

// 组建一个带爬取的数组
var fetchCourseArray = [];

// 遍历数组生成章节的链接;
videoIds.forEach(function(id) {
	fetchCourseArray.push(getPageAsync(baseUrl + id))
});

// 
Promise
	.all(fetchCourseArray)
	.then(function(pages) {
		// 声明一个
		var coursesData = [];

		pages.forEach(function(html) {

			var courses = filterChapters(html);

			coursesData.push(courses);
		});

		// 根据人数从大到小进行排序
		coursesData.sort(function(a, b) {
			return a.number < b.number
		})

		printCourseInfo(coursesData);
	});
