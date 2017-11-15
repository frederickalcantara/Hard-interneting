const StaticServer = require("static-server");

let server = new StaticServer({
  rootPath: "./app/",
  port: 1337,
  templates: {
    index: 'speaker-submission.html'
  }
});

server.start(() => {
  console.log(`Server started on port ${server.port}`);
});
