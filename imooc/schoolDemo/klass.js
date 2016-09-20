// 引入student、teacher模块
var student = require("./student");
var teacher = require("./teacher");

exports.add = function (klass, teacherName, students){

	console.log("\n"+ klass);

	teacher.add(teacherName);

	students.forEach(function (item, index){
		student.add(item);
	});
};
