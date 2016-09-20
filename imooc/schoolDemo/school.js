// 引入klass模块
var klass = require("./klass");

exports.add = function (klasses) {

	klasses.forEach(function (item, index){
		
		var _klass = item,

			klassName = _klass.klassName,

			teacherName = _klass.teacherName,

			students = _klass.student;

		klass.add(klassName, teacherName, students);		
	});
};