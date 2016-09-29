// 引入建模工具模块 
// 1.jade快速入门https://segmentfault.com/a/1190000000357534
// 2.mongoose入门https://segmentfault.com/a/1190000005711812
// 关于mongoose: http://blog.csdn.net/sinat_25127047/article/details/50560167
var mongoose = require("mongoose");

var MovieSchema = new mongoose.Schema({
	doctor: String,
	title: String,
	language: String,
	country: String,
	summary: String,
	flash: String,
	poster: String,
	year: Number,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});

MovieSchema.pre("save", function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else {
		this.meta.updateAt = Date.now();
	}
	next()
})

MovieSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort("meta.updateAt")
			.exec(cb);
	},
	findById: function(id, cb) {
		return this
		.findOne({_id: id})
		.exec(cb)
	}
}

module.exports = MovieSchema;