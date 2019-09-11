const gulp = require("gulp");
const webpack = require("webpack-stream");
var exec = require('child_process').exec;
const nodemon = require("gulp-nodemon");

function build(){
  return gulp.src('./src/client/js/main.js')
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(gulp.dest("./dist/client/js"))
}
function html(){
  return gulp.src("./src/client/index.html")
    .pipe(gulp.dest("./dist/client"))
}

function css(){
  return gulp.src("./src/client/css/*.css")
    .pipe(gulp.dest("./dist/client/css"))
}
function watchJS(){
  gulp.watch('src/client/js/main.js', build);
}
function watchHTML(){
  gulp.watch('src/client/*.html', html);
}
function sendIm() {
  return gulp.src("./src/client/img/**")
    .pipe(gulp.dest("./dist/client/img"))
}
function watchCSS(){
  gulp.watch('src/client/css/*.css', gulp.parallel(css));
}
function startServer(){
  nodemon({
    script: './dist/server.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
}
module.exports.build = build;
module.exports.html = html;
module.exports.css = css;
module.exports.watch = gulp.parallel(watchJS, watchHTML, watchCSS);
module.exports.default = gulp.parallel(build, html, css, watchJS, watchHTML, watchCSS, startServer, sendIm);
