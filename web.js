var express = require('express');
var fs = require('fs');

var app = express.createServer(express.logger());
var buffer = new Buffer("Hello world!");

fs.readFileSync("index.html", function (err, data){
    if(err){
	console.log("error reading file index.html");
    }else{
	buffer.write(data, 0, data.length, "utf-8");
    }
});


console.log("read from buffer: " + buffer.toString());

app.get('/', function(request, response) {
  response.send(buffer.toString());
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
