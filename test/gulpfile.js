//sudo npm install gulp gulp-css-count

var gulp = require('gulp');
var gulp_css_count = require('gulp-css-count');

gulp.task('default', function() {
  return gulp.src('./*.css')
    .pipe(gulp_css_count());
});
