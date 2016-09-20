// 引入 events 模块
var events = require("events");

// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

// 监听器 #1
var  listener1 = function listener1() {
	console.log("监听器 listener1执行.");
};

// 监听器 #2
var listener2 = function listener2() {
	console.log("监听器 listener2执行.");
};

// 使用 addListenner方法绑定 connerction 事件, 处理函数为 listener1
eventEmitter.addListener("connection", listener1)

// 使用 on方法绑定 connection 事件, 处理函数为listener2;
eventEmitter.on("connection", listener2);

// 触发 connection 事件;
eventEmitter.emit("connection");

// 返回 connection 事件的监听数量;
var eventListeners = require("events").EventEmitter.listenerCount(eventEmitter, "connection");
console.log(eventListeners +" 个监听器监听连接事件."+"\n");

// 使用 removeListener方法移除 connection 事件绑定的 listener1 函数;
eventEmitter.removeListener("connection", listener1);
console.log("listener1 不再受监听.");

// 触发 connection 事件;
eventEmitter.emit("connection");

// 监听 connection 事件的监听数量;
eventListeners = require("events").EventEmitter.listenerCount(eventEmitter, "connection");
console.log(eventListeners +" 个监听器监听连接事件.")

console.log("\n"+"程序执行完毕.");

// 关于 error 事件;
// var events = require("events");
// var emitter = new events.EventEmitter();
// emitter.emit('error');
