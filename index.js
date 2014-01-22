var Hapi = require('hapi');
var Tabletop = require('tabletop');

var sheetData = [],
	events = [],
	projects = [];

var port = eval(process.env.PORT) || 8080;

var tabletop,
	KEY = '0AhSAZYKyt0p7dER5T3JOQkhjOC1nSWoxdmh5bzFkUFE';

var options = {
    views: {
        path: 'templates',
        engines: {
            html: 'handlebars'
        },
        partialsPath: 'partials'
    }
}; 

function getData() {
	tabletop = Tabletop.init({
	    key: KEY,
	    callback: function(data, tabletop) { 
	        sheetData = data;
	        if(sheetData) {
                if(sheetData.Events){
                    events = sheetData.Events.elements;
                    console.log("EVENTS", events);
                } if(sheetData.Projects){ 
                    projects = sheetData.Projects.elements;
                    console.log("PROJECTS", projects);
                }
            }
	    },
	    simpleSheet: false 
	});
}

getData();
setInterval(getData, 60000);

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