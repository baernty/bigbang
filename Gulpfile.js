/* Modules
------------------------------------- */
var gulp        = require('gulp'),
    sass        = require('gulp-ruby-sass'),
    prefix      = require('gulp-autoprefixer'),
    livereload  = require('gulp-livereload'),
    uglify      = require('gulp-uglify');


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
            style: 'compact',
            sourcemapPath: './assets',
            loadPath: [bowerDir, scssSrcDir]
        }))
        .pipe(prefix({
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
            cascade: true
        }))
        .pipe(gulp.dest('.'))
        .pipe(livereload());
});


/* Modernizr
------------------------------------- */
gulp.task('modernizr', function () {
    gulp.src(bowerDir + 'modernizr/modernizr.js')
        .pipe(uglify())
        .pipe(gulp.dest(jsDir));
});


/* Watch Task
------------------------------------- */
gulp.task('watch', function () {
    var server = livereload();

    gulp.watch(scssSrcDir + '**/*.scss', ['sass']);
    gulp.watch(['**/*.php']).on('change', function (file) {
        server.changed(file.path);
    });
});


/* Default Task
------------------------------------- */
gulp.task('default', ['sass', 'modernizr', 'watch']);
