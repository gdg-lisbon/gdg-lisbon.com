var Hapi = require('hapi');

// Create a server with a host and port
var port = process.env.PORT || 8000
var server = Hapi.createServer('localhost', port);

server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
        directory: { path: './public', listing: true, index: true }
    }
});

server.start();