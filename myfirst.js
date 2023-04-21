//create an instance of http module as var http
var http = require('http');
var appUser = require('userevents/usermodule');
var events = require('events');

var eventEmitter = new events.EventEmitter();

//createServer obv creates a server object
//http.createServer(function (req, res){
    eventEmitter.on('addUserEntry', appUser.createUser);
    eventEmitter.emit('addUserEntry');

    // eventEmitter.on('addEntry', appUser.addEntry());
    // eventEmitter.emit('addEntry');
//}).listen(8080); //when user accesses port 8080 http.createServer() will be executed




