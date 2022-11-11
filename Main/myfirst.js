//create an instance of http module as var http
var http = require('http');
var fs = require('fs');
var url = require('url');

//createServer obv creates a server object
http.createServer(function (req, res){
    var q = url.parse(req.url, true);
    //outputs ./filename
    var filename = "." + q.pathname;
    fs.readFile(filename, function(err, data) {
        if(err){
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }
        //writeHead, 200 is status code for ok, second arg is object containing response headers
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(8080); //when user accesses port 8080 http.createServer() will be executed


//create an event called scream and fire myEventHandler
// var events = require('events');
// var eventEmitter = new events.EventEmitter();

// //Create an event handler:
// var myEventHandler = function () {
//   console.log('I hear a scream!');
// }

// //Assign the event handler to an event:
// eventEmitter.on('scream', myEventHandler);

// //Fire the 'scream' event:
// eventEmitter.emit('scream');