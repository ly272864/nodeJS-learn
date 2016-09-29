// express node应用搭建模块
var express = require("express");
// 加载表单序列化模块
var bodyParser = require('body-parser');
// 加载路径处理模块
// 该模块能规范的输出模块路径
// 这里主要是兼容多服务端的路径访问
// 没有此模块也能正常运行
var path = require("path");
// 加载mongoDB数据处理模块
var mongoose = require("mongoose");
// 加载mongoDB数据模型集
var Movie = require("./models/movie"); // 注：注意区分大小写;

// 加载函数库
// Underscor.js定义了一个下划线（_）对象，类似jquery的$
// 函数库的所有方法都属于这个对象。这些方法大致上可以分成：
// 集合（collection）、数组（array）、函数（function）、
// 对象（object）和工具（utility）五大类
// 说白了就是一个对以上数据有强大处理能力的模块
var _ = require("underscore");

// 端口设置
// process.env.PORT 这里是指Node环境中默认的端口
var port = process.env.PORT || 3000;

// 创建服务应用实例
var app = express();

// 连接数据库
// 这里需要安装Mongodb,并且要启动mongodb服务
mongoose.connect("mongodb://127.0.0.1:27017/imooc");

// 设置视图路径
app.set("views", "./views/pages");
// 设置模板引擎为jade
app.set("view engine", "jade");

// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({extended: true}));

// express4版本内置的静态资源读取express.static()
// 指定读取静态资源的路径为public文件夹
// 这里主要是加载bootstrap中的 css js）
// __dirname变量获取当前模块文件所在目录的完整绝对路径
// app.use()是干啥的呢？
// app.use 加载用于处理http請求的middleware（中间件），
// 当一个请求来的时候，会依次被这些 middlewares处理
app.use(express.static(path.join(__dirname, "public"))) // 配置静态资源,注：__不是_;被坑惨了

// 加载时间处理模块
// app.locals对象字面量中定义的键值对，
// 是可以直接在模板中使用的，
// 就和res.render时开发者传入的模板渲染参数一样
// 这里是指可以在模板中使用moment方法
// 在list.jade中我们需要将数据中的时间转换成mm/dd/yyyy
// 那么就需要用到moment，所以这里是为了将该方法能传入到模板中
// 这里如果换成app.locals.dateFun = require('moment');
// 在list模板中我们就需要 #{dateFun(xxxxx).format(MM/DD/YYYY)}
app.locals.moment = require('moment');

// 监听端口
app.listen(port);

console.log("imooc started on port " + port);

// index page
app.get("/", function(req, res) {
	Movie.fetch(function(err, movies) {

		if(err) { console.log(err) }

		res.render("index", {
			title: "imooc 首页",
			movies: movies
			// movies: [{
			// 	title: '机械战警',
			// 	_id: 1,
			// 	poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			// },
			// {
			// 	title: '机械战警',
			// 	_id: 2,
			// 	poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			// },
			// {
			// 	title: '机械战警',
			// 	_id: 3,
			// 	poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			// },
			// {
			// 	title: '机械战警',
			// 	_id: 4,
			// 	poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			// },
			// {
			// 	title: '机械战警',
			// 	_id: 5,
			// 	poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			// },
			// {
			// 	title: '机械战警',
			// 	_id: 6,
			// 	poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			// }]
		})	
	})
})

// detail page
app.get("/movie/:id", function(req, res) {

	var id = req.params.id;

	Movie.findById(id, function(err, movie) {

		res.render("detail", {
			title: "imooc" + movie.title,
			movie: movie
			// movie: {
			// 	doctor: '何塞·帕迪里亚',
		 // 		country: '美国',
		 // 		title: '机械战警',
		 // 		year: '2014',
		 // 		poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
		 // 		language: '英语',
		 // 		flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
		 // 		summary: '《机械战警》是由何塞·帕迪里亚执导，乔尔·金纳曼、塞缪尔·杰克逊、加里·奥德曼等主演的一部科幻电影，改编自1987年保罗·范霍文执导的同名电影。影片于2014年2月12日在美国上映，2014年2月28日在中国大陆上映。影片的故事背景与原版基本相同，故事设定在2028年的底特律，男主角亚历克斯·墨菲是一名正直的警察，被坏人安装在车上的炸弹炸成重伤，为了救他，OmniCorp公司将他改造成了生化机器人“机器战警”，代表着美国司法的未来。'
			// }
		})
	})
})

// admin update movie
app.get("/admin/update/:id", function(req, res) {
	var id = req.params.id;

	if(id) {
		Movie.findById(id, function(err, movie) {
			res.render("admin", {
				title: "imooc 后台更新页",
				movie: movie
			})
		})
	}
});


// admin page
app.get("/admin/movie", function(req, res) {
	res.render("admin", {
		title: "imooc 后台录入页",
		movie: {
			title: '',
			doctor: '',
			country: '',
			year: '',
			poster: '',
			flash: '',
			summary: '',
			language: ''
		}
	})
})

// admin post movie
app.post("/admin/movie/new", function(req, res) {

	if(!req.body) return res.sendStatus(400);

	var id = req.body.movie._id;
	var movieObj = req.body.movie;
	var _movie;
	
	// console.log(req.body.movie);

	if(id !== "undefined") {

		Movie.findById(id, function(err, movie) {

			if(err) { console.log(err) }

			_movie = _.extend(movie, movieObj)
			_movie.save(function(err, movie) {
				if(err) {
					console.log(err)
				}

				res.redirect("/movie/" + movie._id);
			})
		})
	}
	else {

		_movie = new Movie({
			title: movieObj.title,
			doctor: movieObj.doctor,
			country: movieObj.country,
			language: movieObj.language,
			poster: movieObj.poster,
			flash: movieObj.flash,
			year: movieObj.year,
			summary: movieObj.summary
		});


		 // _movie = new Movie({
   //    title: movieObj.title,
   //    doctor: movieObj.doctor,
   //    country: movieObj.country,
   //    language: movieObj.language,
   //    poster: movieObj.poster,
   //    flash: movieObj.flash,
   //    year: movieObj.year,
   //    summary: movieObj.summary
   //  });

		_movie.save(function(err, movie) {

			if(err) { console.log(err) }

			res.redirect("/movie/" + movie._id);
		})
	}
});


// list page
app.get("/admin/list", function(req, res) {
	Movie.fetch(function(err, movies) {

		if(err) { console.log(err) }

		res.render("list", {
			title: "imooc 列表页",
			movies: movies
			// movies: [{
			// 	title: '机械战警',
			// 	_id: 1,
			// 	doctor: '何塞·帕迪里亚',
			// 	country: '美国',
			// 	year: 2014,
			// 	language: '英语',
			// 	flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			// 	summary: '《机械战警》是由何塞·帕迪里亚执导，乔尔·金纳曼、塞缪尔·杰克逊、加里·奥德曼等主演的一部科幻电影，改编自1987年保罗·范霍文执导的同名电影。影片于2014年2月12日在美国上映，2014年2月28日在中国大陆上映。影片的故事背景与原版基本相同，故事设定在2028年的底特律，男主角亚历克斯·墨菲是一名正直的警察，被坏人安装在车上的炸弹炸成重伤，为了救他，OmniCorp公司将他改造成了生化机器人“机器战警”，代表着美国司法的未来。'
			// }]
		})
	})
})


// list delete movie
app.delete("/admin/list", function(req, res) {
	var id = req.query.id;

	if(id) {
		Movie.remove({_id: id}, function(err) {
			if(err) {
				console.log(err)
			}
			else {
				res.json({success: 1});
			}
		})
	}
});