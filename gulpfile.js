var gulp = require('gulp'),
    uglify= require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint');


gulp.task('minijs-filter',function(){
    return gulp.src('./js/filter.js')
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify({
            mangle: {except: ['require' ,'exports' ,'module' ,'$']}//排除混淆关键字
        }))
        .pipe(gulp.dest('./dist/js/'));
});
//压缩并合并js文件
gulp.task('minifyjs-service', function() {
    return gulp.src('./js/service/*.js')      //需要操作的文件
        .pipe(concat('service.js'))    //合并所有js到main.js
        .pipe(gulp.dest('./dist/js/'))       //输出到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify({
            //mangle: true,//类型：Boolean 默认：true 是否修改变量名
            mangle: {except: ['require' ,'exports' ,'module' ,'$']}//排除混淆关键字
        }))    //压缩
        .pipe(gulp.dest('./dist/js/'));  //输出
});

gulp.task('minifyjs-controller', function() {
    return gulp.src('./js/controller/*.js')      //需要操作的文件
        .pipe(concat('controller.js'))    //合并所有js到main.js
        .pipe(gulp.dest('./dist/js/'))       //输出到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify({
            //mangle: true,//类型：Boolean 默认：true 是否修改变量名
            mangle: {except: ['require' ,'exports' ,'module' ,'$']}//排除混淆关键字
        }))    //压缩
        .pipe(gulp.dest('./dist/js/'));  //输出
});

// 建立js任务，进行代码检查
gulp.task('jshint-service', function(){
    gulp.src(['./js/service/*.js'])  // 检查文件：js目录下所有的js文件
        .pipe(jshint())       // 进行检查
        .pipe(jshint.reporter('default'))  // 对代码进行报错提示
});
// 建立js任务，进行代码检查
gulp.task('jshint-controller', function(){
    gulp.src('./js/controller/*.js')  // 检查文件：js目录下所有的js文件
        .pipe(jshint())       // 进行检查
        .pipe(jshint.reporter('default'))  // 对代码进行报错提示
});

//复制 vender 的js文件到指定的目录下
gulp.task('copy-vender',function(){
    return gulp.src(['./vender/underscore/underscore-min.js',
        './vender/js-md5/build/md5.min.js',
        //'./vender/async/dist/async.min.js',
        //'./vender/ionic-platform-web-client/dist/ionic.io.bundle.min.js',
        //'./vender/ngCordova/dist/ng-cordova.min.js',
        './vender/aeapi/ae.min.js'])
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('jshint',function(){
    return gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//gulp.task('default', ['jshint-service','jshint-controller','minijs-filter','minifyjs-service','minifyjs-controller','copy-vender']);
gulp.task('default',['jshint']);
