const gulp = require("gulp");
const webpack = require("webpack-stream");
const exec = require('child_process').exec;

function html() {
  return gulp.src("./src/client/**")
    .pipe(gulp.dest("./dist"))
}

function js() {
  return gulp.src("./src/client/js/**")
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(gulp.dest("./dist/client/js"))
}


function watchAll() {
  gulp.watch("./src/**", gulp.parallel(html, js))
}

function watchServe() {
  gulp.watch("./src/*.js", serve)
}

module.exports.default = gulp.parallel(html, js, watchAll, watchServe);
