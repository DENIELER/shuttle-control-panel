var nativeMessage = require('chrome-native-messaging');

var input = new nativeMessage.Input();
var transform = new nativeMessage.Transform(messageHandler);
var output = new nativeMessage.Output();

process.stdin
    .pipe(input)
    .pipe(transform)
    .pipe(output)
    .pipe(process.stdout)
;

var subscriptions = {};

var timer = setInterval(function() {
    if (subscriptions.time) {
        output.write({ time: new Date().toISOString() });
    }
}, 1000);

input.on('end', function() {
    clearInterval(timer);

    process.exit();
});

function messageHandler(msg, push, done) {
	done();
}

var http = require('http');
var url = require('url');

var config = require('./config');

var PORT = config.PORT;

http.createServer(function (request, response) {

    try {
        var relative_path = url.parse(request.url).pathname;

        if (relative_path === '/next-song') {
            sendActionToExtension(response, 'next-song');
        } else if (relative_path === '/prev-song') {
        	sendActionToExtension(response, 'prev-song');
        } else if (relative_path === '/pause-song') {
        	sendActionToExtension(response, 'pause-song');
        } else if (relative_path === '/up-volume') {
        	sendActionToExtension(response, 'up-volume');
        } else if (relative_path === '/down-volume') {
        	sendActionToExtension(response, 'down-volume');
        } else {
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end();
        }
    } catch (e) {
        response.writeHead(500, {'Content-Type': 'text/plain'});
        response.end('Server Error. Error: ' + e.message);
    }

}).listen(PORT);

function sendActionToExtension (res, msg) {
	output.write({ action: msg });
    
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end();
}