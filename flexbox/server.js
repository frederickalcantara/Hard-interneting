const StaticServer = require('static-server');

let server = new StaticServer({
    rootPath: './app/flexbox',
    port: 3000
});

server.start(function () {
    console.log(`Server started on port ${server.port}`);
});