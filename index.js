var Hapi = require('hapi');
var Tabletop = require('tabletop');

var sheetData = [],
	events = [],
	projects = [];

var port = eval(process.env.PORT) || 8080;

var KEY = '0AhSAZYKyt0p7dER5T3JOQkhjOC1nSWoxdmh5bzFkUFE';

var options = {
    views: {
        path: 'templates',
        engines: {
            html: 'handlebars'
        },
        partialsPath: 'partials'
    }
}; 

Tabletop.init({
    key: KEY,
    callback: function(data, tabletop) { 
        //console.log(data); 
        sheetData = data;
        events = sheetData.Events.elements;
        projects = sheetData.Projects.elements;

        console.log("EVENTS", events);
        console.log("PROJECTS", projects);
    },
    simpleSheet: false 
});

// Create a server with a host, port, and options
var server = Hapi.createServer('0.0.0.0', port, options);

var routes = [
    { method: 'GET', path: '/', config: { handler: homeHandler } },
    { method: 'GET', path: '/{path*}', handler: {
        directory: { path: './public', listing: true, index: true }
    } }
];

server.route(routes);

function homeHandler (request, reply) {
    // Render the view with the custom greeting
    reply.view('index.html', { 
        events: events,
        projects: projects
    });
};

// Start the server
server.start(function () {
    uri = server.info.uri;
    console.log('Server started at: ' + server.info.uri);
});