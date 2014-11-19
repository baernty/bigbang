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
        .pipe(sass({
            sourcemapPath: './assets',
            loadPath: [bowerDir, scssSrcDir]
        }))
        .pipe(prefix({
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
            cascade: true
        }))
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
