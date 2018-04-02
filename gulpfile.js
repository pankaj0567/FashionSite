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
    gulp.src('DevelopmentCode/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('ProductionCode/'));
        
});

// Task to compile Sass file into CSS, and minify CSS into build directory
gulp.task('sass',function(){
    gulp.src(DevelopmentCode+'scss/*.scss')
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(ProductionCode+'css/'));
});

//creating task for concat and minify js
gulp.task('concatjs',function(){
    gulp.src([DevelopmentCode+'js/*.js',!DevelopmentCode+'js/*.min.'])
        // .pipe(jsHint())
        // .pipe(jsHint.reporter('jshint-stylish'))
        .pipe(plumber())
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(plugins.rename({suffix:'.min'}))
        .pipe(gulp.dest(ProductionCode+'js/'));
});


//creating liveload with the help of browser-sync
gulp.task('browser-sync',function(){
    browserSync.init({
        server : {
            baseDir : 'DevelopmentCode/'
        },
    });
});

//creating a task for minify images
gulp.task('imagemin',function(){
  return gulp.src(DevelopmentCode+'images/**/*')
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest(ProductionCode+'images/'));
});


//creating task for concat and minify css
gulp.task('concatcss',function(){
    gulp.src([DevelopmentCode+'css/*.css',!DevelopmentCode+'css/*.min.'])
        // .pipe(jsHint())
        // .pipe(jsHint.reporter('jshint-stylish'))
        .pipe(plumber())
        .pipe(concat('bundle.css'))
        .pipe(minifyCSS())
        .pipe(plugins.rename({suffix:'.min'}))
        .pipe(gulp.dest(ProductionCode+'css/'));
});

//creating task for concat and minify html
gulp.task('minifyhtml',function(){
    gulp.src(DevelopmentCode+'**/*.html')
        .pipe(plumber())
        .pipe(minifyHTML())
        .pipe(gulp.dest(ProductionCode));
});


gulp.task('watch',['browser-sync', 'concatjs', 'sass','imagemin','concatcss','minifyhtml'], function () {
    gulp.watch(DevelopmentCode+'scss/*.scss', ['sass']);
    gulp.watch(DevelopmentCode+'js/*.js', ['concatjs']);
    gulp.watch(DevelopmentCode+'images/**/*', ['imagemin']);
    gulp.watch(DevelopmentCode+'css/*.css', ['concatcss']);
    gulp.watch(DevelopmentCode+'**/*.html', ['minifyhtml']);  
    // Reloads the browser whenever HTML or JS files change
    gulp.watch(DevelopmentCode+'**/*.*', browserSync.reload);
});

//default task
gulp.task('default',['Welcome','clone','watch']);