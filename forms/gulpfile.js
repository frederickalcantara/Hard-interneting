const gulp = require("gulp");
const uglify = require("gulp-uglify");
const refresh = require("gulp-refresh");
const concat = require("gulp-concat");

// CSS Files
const minifyCSS = require("gulp-minify-css");
const autoprefixer = require("gulp-autoprefixer");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");

const dist_path = "app/dist";
const htmlSource = "app/*.html";
const cssSource = "app/*.css";

gulp.task("html", () => {
  return gulp.src(htmlSource).pipe(refresh());
});

gulp.task("styles", function() {
  console.log("Starting styles task");
  return gulp
    .src(cssSource)
    .pipe(
      plumber(function(err) {
        console.log("Styles Task Error");
        console.log(err);
        this.emit("end");
      })
    )
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(concat("styles.css"))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist_path))
    .pipe(refresh());
});

gulp.task("clean", function() {
  return del.sync([dist_path]);
});

gulp.task("default", ["clean", "styles", "html"], function() {
  console.log("Starting default task");
});

gulp.task("watch", ["default"], function() {
  console.log("Starting watch task");
  require("./server.js");
  refresh.listen();
  gulp.watch(cssSource, ["styles"]);
  gulp.watch(htmlSource, ["html"]);
});
