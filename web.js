var express = require('express');
var fs = require('fs');

var app = express.createServer(express.logger());
var buffer = new Buffer("Hello world!");
var filename = "./index.html";
var data = buffer.toString("utf8", 0, buffer.length);

fs.exists(filename, function(exists){
	if(exists){
		fs.stat(filename, function(error, stats){
			fs.open(filename, "r", function(error, fd){
				buffer = new Buffer(stats.size);
				fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer){
					data = buffer.toString("utf8", 0, buffer.length);
					fs.close(fd);
				});
			});
		});

	}
});

app.get('/', function(request, response) {
	console.log(data);
	response.send(data);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
});
