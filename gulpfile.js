var gulp      = require('gulp');
var gutil     = require('gulp-util');
var bower     = require('bower');
var concat    = require('gulp-concat');
var sass      = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename    = require('gulp-rename');
var sh        = require('shelljs');
var jade      = require('gulp-jade');
var jshint    = require('gulp-jshint');
var jscs      = require('gulp-jscs');

var paths = {
  sass: ['./scss/**/*.scss'],
  jade: ['./jade/**/*.jade'],
  code: ['./www/js/**/*.js']
};

gulp.task('default', ['sass', 'jade', 'lint', 'jscs', 'watch']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('jade', function() {
  gulp.src(paths.jade)
    .pipe(jade({pretty: true, doctype: 'html'}))
    .pipe(gulp.dest('./www/'));
});

gulp.task('lint', function() {
  return gulp.src(paths.code)
           .pipe(jshint())
           .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('jscs', function() {
  return gulp.src(paths.code)
           .pipe(jscs());
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.code, ['lint']);
  gulp.watch(paths.code, ['jscs']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
