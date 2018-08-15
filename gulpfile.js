var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create();
    
    


/*** js task ***/

 gulp.task('js', function(){
  return gulp.src('js/*.js')
    .pipe(plumber())
    .pipe(jshint('.jshintrc'))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream())
    .pipe(notify({ message: 'Styles js task complete' }));
});





/*** sass task ***/

gulp.task('sass', function(){
    return gulp.src('sass/main.scss')
      .pipe(plumber())
      .pipe(autoprefixer('last 2 versions'))
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(concat("style.min.css"))
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.stream())
      .pipe(notify({ message: 'Styles sass task complete' }))
  });



/*** images task ***/

gulp.task('images', function() {
    return gulp.src('images/*')
      .pipe(gulp.dest('dist/images'))
      .pipe(imagemin({optimizationLevel: 5}))
      .pipe(browserSync.stream())
      .pipe(notify({ message: 'Images task complete' }));
  });+




/*** serve task ***/

  gulp.task('serve',function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
   gulp.watch("*.html").on("change", browserSync.reload);
});






 // Watch
gulp.task('watch', function(done) {

    // Watch .scss files
    gulp.watch('sass/**/*.scss', ['sass']);
  
    // Watch .js files
    gulp.watch('js/*.js', ['js']);
  
    // Watch image files
    gulp.watch('images/*', ['images']);

    browserSync.reload();
    done();
  

  }); 


gulp.task('default', [ 'js' ,'sass' , 'images', 'serve',  'watch' ]);