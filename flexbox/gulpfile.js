const gulp = require('gulp');
const uglify = require("gulp-uglify");
const liveReload = require("gulp-livereload");
const concat = require("gulp-concat");

// CSS & JS Files
const minifyCSS = require("gulp-minify-css");
const autoprefixer = require("gulp-autoprefixer");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");

const dist_path = 'app/dist';
const htmlSource = 'app/*.html';
const cssSource = 'app/*.css';

gulp.task('html', () => {
	return gulp.src(htmlSource)
	.pipe(liveReload());
});

gulp.task("styles", function() {
  console.log("Starting styles task");
  return (gulp
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
      .pipe(liveReload()));
});

gulp.task("clean", function() {
  return del.sync([dist_path]);
});

gulp.task(
  "default",
  ["clean", "styles", "html"],
  function() {
    console.log("Starting default task");
  }
);

gulp.task("watch", ["default"], function() {
  console.log("Starting watch task");
  require("./server.js");
  liveReload.listen();
  gulp.watch(cssSource, ["styles"]);
  gulp.watch(htmlSource, ["html"]);
});