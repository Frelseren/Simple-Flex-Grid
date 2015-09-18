'use strict';
//REQUIRMENTS
var gulp	= require('gulp'),
	sass 	= require('gulp-sass'),
	minify 	= require('gulp-minify-css'),
	rename 	= require('gulp-rename'),
	maps 	= require('gulp-sourcemaps'),
	del 	= require('del');
//COMPILE SASS TO CSS
gulp.task('sass', function() {
  return gulp.src("scss/grid.scss")
  	  .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('css'));
});
//MINIFY CSS
gulp.task('minify', ['sass'], function() {
  return gulp.src('css/*.css')
    .pipe(minify({compatibility: 'ie8'}))
    .pipe(rename('grid.min.css'))
    .pipe(gulp.dest('css'));
});
//WATCH
gulp.task('watch', function() {
	gulp.watch('scss/**/*.scss', ['sass']);
});
//CLEAN
gulp.task('clean', function() {
	del(['dist', 'css/grid.css*', 'css/grid.min.css']);
});
//BUILD
gulp.task('build', ['minify'], function() {
	return gulp.src(['css/grid.css*', 'css/grid.min.css'], {base: './'})
				.pipe(gulp.dest('dist'));
});
//DEFAULT
gulp.task('default', ['clean'], function() {
	gulp.start('build');
});


