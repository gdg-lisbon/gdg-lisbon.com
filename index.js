var Hapi = require('hapi');

// Create a server with a host and port

console.log("PORT:",process.env.PORT);
var port = process.env.PORT || 8000;
var server = Hapi.createServer("gdg-lisbon.com",port);

server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
        directory: { path: __dirname + '/public', listing: true, index: true }
    }
});

// Start the server
server.start(function () {
    uri = server.info.uri;
    console.log('Server started at: ' + server.info.uri);
});