/**
 *
 * Created by zilong on 9/20/14.
 */

var gulp = require('gulp')
var browserify = require('gulp-browserify')
var karma = require('gulp-karma')

gulp.task('browserify4test',function(){
    gulp.src('test/*.js')
        .pipe(browserify())
        .pipe(gulp.dest('test/Spec'))
})
gulp.task('test',['browserify4test'],function(){
    gulp.src('test/Spec/**/*.js')
        .pipe(karma({
            configFile:'karma.conf.js',
            action:'run'
        }))
        .on('error',function(err){
            throw err;
        })
})