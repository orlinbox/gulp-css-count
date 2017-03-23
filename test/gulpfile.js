var gulp = require('gulp');
var size = require('gulp-filesize');

gulp.task('default', function() {
  gulp.src('./*.css')
    .pipe(gulp.dest('./test/')
    .pipe(size());
});
