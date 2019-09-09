const gulp = require("gulp");
const webpack = require("webpack-stream");

function html() {
  return gulp.src("./src/client/*.html/css/**")
    .pipe(gulp.dest("./dist"))
}

function js() {
  return gulp.src("./src/client/js/**")
    .pipe(webpack(gulp.src("./webpack.config.js")))
    .pipe(gulp.dest("./dist"))
}

module.exports.default = gulp.parallel(html, js);
