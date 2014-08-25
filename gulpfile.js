var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    del = require('del');

/**
 * Setting up SCSS to css
 */

gulp.task('styles', function() {
    return gulp.src('front-end/assets/sass/screen.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('build/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('www/assets/css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

/**
 * Cleaning up for deploy
 */

gulp.task('clean', function(cb) {
    del(['dist/assets/css'], cb)
});


gulp.task('default', ['clean'], function() {
    gulp.start('styles');
});


gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('front-end/assets/sass/screen.scss', ['styles']);

    livereload.listen();
    gulp.watch(['build/**']).on('change', livereload.changed);


});
