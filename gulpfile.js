var DevelopmentCode='DevelopmentCode/';
var ProductionCode='ProductionCode/';

//creating gulp object 
var gulp=require('gulp');

//dependency injection npm install --save-dev gulp-jshint jshint-stylish
//var jsHint=require('gulp-jshint');

//dependency injection npm install --save-dev gulp-util
var gulpUtil=require('gulp-util')

//dependency injection npm install --save-dev gulp-sass
var sass=require('gulp-sass');

//dependency injection npm install --save-dev gulp-concat
var concat=require('gulp-concat');

//dependency injection npm install --save-dev gulp-uglify
var uglify=require('gulp-uglify');

//dependency injection npm install --save-dev gulp-load-plugins
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

//dependency injection npm install --save-dev browser-sync
var browserSync=require('browser-sync').create();

//dependency injection npm install --save-dev gulp-imagemin
var imagemin=require('gulp-imagemin');

//dependency injection npm install --save-dev gulp-minify-css
var minifyCSS = require('gulp-minify-css'); 

//dependency injection npm install --save-dev gulp-minify-html
var minifyHTML = require('gulp-minify-html'); 

//dependency injection npm install --save-dev gulp-rename
var rename = require("gulp-rename");

//dependency injection npm install --save-dev gulp-plumber
var plumber = require('gulp-plumber');

//checking gulp is running
gulp.task('Welcome',function(){
    return gulpUtil.log("Welcome gulp is running");
});


//make a task for copy all file to ProductionCode
gulp.task('clone',function(){
    gulp.src(['DevelopmentCode/**/*',,"!"+DevelopmentCode+'/**/*.scss',"!"+DevelopmentCode+'/**/*.css' ,"!"+DevelopmentCode+'/**/*.js',"!"+DevelopmentCode+'/**/*.css',"!"+DevelopmentCode+'/**/images/*.*'])
        .pipe(plumber())
        .pipe(gulp.dest('ProductionCode/'));
        
});
// Task to compile Sass file into CSS, and minify CSS into build directory
gulp.task('sass',function(){
    gulp.src(DevelopmentCode+'wwwroot/scss/*.scss')
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(DevelopmentCode+'wwwroot/css/'));
        
});


//creating liveload with the help of browser-sync
gulp.task('browser-sync',function(){
    browserSync.init({
        server : {
            baseDir : 'DevelopmentCode/'
        },
    });
});

gulp.task('watch',['browser-sync' , 'sass'], function () {
    gulp.watch(DevelopmentCode+'/**/scss/*.scss', ['sass']);
    //gulp.watch(DevelopmentCode+'js/*.js', ['concatjs']);
    // gulp.watch(DevelopmentCode+'images/**/*', ['imagemin']);
    // gulp.watch(DevelopmentCode+'/**/css/*.css', ['concatcss']);
    // gulp.watch(DevelopmentCode+'**/*.html', ['minifyhtml']);  
    // // Reloads the browser whenever HTML or JS files change
    gulp.watch(DevelopmentCode+'**/*.*', browserSync.reload);
});

//default task
gulp.task('default',['Welcome','clone','watch']);