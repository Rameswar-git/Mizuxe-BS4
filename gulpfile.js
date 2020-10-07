const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

function browserSyncInit(done) {
  browserSync.init({
    server: {
      baseDir: "./src"
    },
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browserSync.reload();
  done();
}

// Compile SASS
function compileSass() {
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
}

// Move JS Files to SRC
function scripts() {
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js'])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
}
// Watch SASS & Serve
function watchFiles() {
  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], gulp.series(compileSass));
  gulp.watch("src/*.html").on('change', browserSync.reload);
}

// Move Font Awesome Fonts folder to src
function moveFonts() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest("src/fonts"));
}

// Move font awesome css file
function moveFontCss() {
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest("src/css"));
}

const runDev = gulp.parallel(gulp.series(compileSass,scripts,moveFonts,moveFontCss,watchFiles),browserSyncInit)

exports.default = runDev;