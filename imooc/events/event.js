
var EventEmitter = require("events").EventEmitter;

// 实例化一个对象;
var life = new EventEmitter()

// 设置事件监听的最大值,
// 官方默认为10个,超过10个可能会造成内存泄露
life.setMaxListeners(11);

function nodejs(who) {	
	console.log("要 " +who+ " nodeJS")
}

life.addListener("技术", nodejs);

// 使用addListener监听事件;
life.addListener("技术", function(who) {
	console.log("要 " +who+ " AngularJs")
});

life.on("技术", function(who) {
	console.log("要 " +who+ " React.js")
});

life.on("技术", function(who) {
	console.log("要 " +who+ " Vue.js")
});

life.on("技术", function(who) {
	console.log("要 " +who+ " glup")
});

life.on("技术", function(who) {
	console.log("要 " +who+ " grunt")
});

life.on("技术", function(who) {
	console.log("要 " +who+ " LESS")
});

life.on("技术", function(who) {
	console.log("要 " +who+ " SCSS")
});

life.on("技术", function(who) {
	console.log("要 " +who+ " SASS")
});

life.on("技术", function(who) {
	console.log("要 " +who+ " javascript")
});

life.on("喜欢", function(who) {
	console.log("我 " +who+ " 看电影")
});

life.on("喜欢", function(who) {
	console.log("我 " +who+ " 看NBA")
});

// 事件监听的移除
// life.removeListener("技术", nodejs);

// 移除所有关于"技术"的事件监听;
life.removeAllListeners("技术");

var hasConfortListener = life.emit("技术", "学习");
var hasLoverListener = life.emit("喜欢", "喜欢");
// var hasPlayedListener = life.emit("好玩", "学习个毛线");

// console.log(hasConfortListener);
// console.log(hasLoverListener);
// console.log(hasPlayedListener);
 
// 获取事件的监听数量;
console.log(life.listeners("技术").length);
console.log(life.listeners("喜欢").length);
// console.log(EventEmitter.listenerCount(life, "技术"));



