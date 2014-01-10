var static = require('node-static');

var file = new(static.Server)('./public');

require('http').createServer(function (request, response) {
    request.on('end', function () {
      file.serve(request, response)
    })
    request.resume()
}).listen(process.env.PORT || 8080, function() { console.log('Listening')});