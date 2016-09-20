var http = require("http");

var server = http.createServer(function (request, response){

	response.writeHead(200, {"content-type": "text/plain"});

	response.write("Hello Node.js!!");

	response.end();

});
server.listen(1337, "192.168.31.102");

console.log("Server running at http://192.168.31.102:1337");