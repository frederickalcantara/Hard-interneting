const gulp = require("gulp");
const refresh = require("gulp-refresh");

const htmlSource = "app/*.html";

gulp.task("html", () => {
  console.log('Starting html task');
  return gulp
  .src(htmlSource)
  .pipe(refresh());
});


gulp.task("watch", ["html"], function() {
  console.log("Starting watch task");
  require("./server.js");
  refresh.listen();
  gulp.watch(htmlSource, ["html"]);
});
