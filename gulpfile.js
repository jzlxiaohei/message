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
        .pipe(gulp.dest('test/spec'))
})
gulp.task('test',['browserify4test'],function(){
    return gulp.src(['test/lib/jquery-1.11.1.js','test/lib/jasmine-jquery.js','test/spec/**/*.js','test/fixtures/*.html'])
        .pipe(karma({
            configFile:'karma.conf.js',
            //action:'watch'
            action:'run'
        }))
        .on('error',function(err){
            throw err;
        })
})