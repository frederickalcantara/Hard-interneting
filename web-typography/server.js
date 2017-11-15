const StaticServer = require("static-server");

let server = new StaticServer({
  rootPath: "./",
  port: 3000,
  templates: {
	  index: 'web-fonts.html'
  }
});

server.start(function() {
  console.log(`Server started on port ${server.port}`);
});
