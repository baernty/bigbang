/* Modules
------------------------------------- */
var gulp        = require('gulp'),
    sass        = require('gulp-ruby-sass'),
    prefix      = require('gulp-autoprefixer');


/* Paths
------------------------------------- */
var assets      = 'assets/',
    jsDir      = assets + 'js/',
    srcDir      = assets + 'src/',
    scssSrcDir  = srcDir + 'scss/',
    jsSrcDir    = srcDir + 'js/',
    bowerDir    = assets + 'bower_components/';


/* Sass Task
------------------------------------- */
gulp.task('sass', function () {
    gulp.src(scssSrcDir + 'style.scss')
        .pipe(sass())
        .pipe(prefix("last 2 versions"))
        .pipe(gulp.dest('.'));
});


/* Watch Task
------------------------------------- */
gulp.task('watch', function () {
    gulp.watch(scssSrcDir + '**/*.scss', ['sass']);
});


/* Default Task
------------------------------------- */
gulp.task('default', ['sass', 'watch']);