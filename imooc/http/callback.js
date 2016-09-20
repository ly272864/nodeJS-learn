// 函数的回调

function learn (something) {
	console.log(something);
}

function we(callback, something) {
	something += " is cool";

	callback(something);
}
// 具名函数的回调;
// we(learn, 'NodeJs');

// 匿名函数的回调;
we(function(something){
	console.log(something)
}, "Jade");
