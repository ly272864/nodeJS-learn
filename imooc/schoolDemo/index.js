// 引入school模块;
var school = require("./school");

var klass = [
				{ 
					klassName: "《小李飞刀》",
					teacherName: "李寻欢",
					student: ["楚留香", "叶开"]
				},
				{ 
					klassName: "《射雕英雄传》",
					teacherName: "王重阳",
					student: ["马钰", "丘处机", "王处一", "郝大通"]
				},
				{ 
					klassName: "《射雕英雄传》",
					teacherName: "洪七公",
					student: ["郭靖", "黄蓉"]
				},
				{
					klassName: "《神雕侠侣》",
					teacherName: "黄药师",
					student: ["陈玄风", "梅超风", "陆乘风", "曲灵风", "冯默风"]
				}
			];

school.add(klass);
