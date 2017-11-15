const StaticServer = require("static-server");

let server = new StaticServer({
  rootPath: './app/',
  port: 8080
});

server.start(function() {
  console.log(`Server started on port ${server.port}`);
});
