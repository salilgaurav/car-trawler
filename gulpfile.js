var gulp   = require('gulp'),
	browserSync = require('browser-sync'),
	reload  = browserSync.reload,
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	minify = require('gulp-minify'),
	cleanCSS = require('gulp-clean-css') ,
	processhtml = require('gulp-processhtml'),
	devUrl = 'app/.tmp-preview';



gulp.task('serve', ['sass','scripts'], function() {  
	browserSync.init({
		server: {
			baseDir: './',
		}
	});

	gulp.watch("./app/scss/*.scss", ['sass-watch']);

	gulp.watch("./app/**/*.js", ['js-watch']);

	gulp.watch("./app/*.js", ['js-watch']);

	gulp.watch("*.html").on("change", reload);

});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp.src("app/scss/*.scss")
	.pipe(sass())
	.pipe(gulp.dest(devUrl))
	.pipe(browserSync.stream());
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('sass-watch', ['sass'], function (done) {
    browserSync.reload();
    done();
});


// Task to concat, strip debugging and minify JS files
gulp.task('scripts', function() {  
    return gulp.src(['app/js/**/*.js', 'app/*.js'])
    .pipe(concat('script.js'))
    .pipe(gulp.dest(devUrl))
    .pipe(browserSync.stream());
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['scripts'], function (done) {
    browserSync.reload();
    done();
});

 // Minify js files
gulp.task('compress',['scripts'] ,function() {
  gulp.src(devUrl+'/*.js')
    .pipe(minify({
        ext:{
            min:'.min.js'
        }
    }))
    .pipe(gulp.dest('dist/assets'))
});

// Minify css files
gulp.task('minify-css',['sass'] ,function() {
  gulp.src(devUrl+'/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/assets'));
});

// Replace in build with correct refrenece
gulp.task('processhtml', function () {
    gulp.src('./index.html')
    	.pipe(processhtml({process: true}))
         .pipe(gulp.dest('dist'));
});

// Copy json file to one location
gulp.task('copy', function () {
    gulp.src('app/data/data.json')
        .pipe(gulp.dest('dist/app/data'));
});

// Dist task for build
// dist folder can be deployed in production
gulp.task('dist',['compress' , 'minify-css' , 'processhtml', 'copy']);