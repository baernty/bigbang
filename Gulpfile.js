/* Modules
------------------------------------- */
var gulp        = require('gulp'),
    clean       = require('gulp-rimraf'),
    concat      = require('gulp-concat'),
    imagemin    = require('gulp-imagemin'),
    jslint      = require('gulp-jslint'),
    livereload  = require('gulp-livereload'),
    prefix      = require('gulp-autoprefixer'),
    sass        = require('gulp-ruby-sass'),
    uglify      = require('gulp-uglify');


/* Paths
------------------------------------- */
var assetsDir      = 'assets/',
    srcDir      = assetsDir + 'src/',
    bowerDir    = assetsDir + 'bower_components/';


/* Sass Task
------------------------------------- */
gulp.task('sass', function () {
    gulp.src(srcDir + 'scss/style.scss')
        .pipe(sass({
            style: 'compact',
            sourcemapPath: './assets',
            loadPath: [bowerDir, srcDir + 'scss/']
        }))
        .pipe(prefix({
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
            cascade: true
        }))
        .pipe(gulp.dest('.'))
        .pipe(livereload());
});


/* Modernizr Task
------------------------------------- */
gulp.task('modernizr', function () {
    gulp.src(bowerDir + 'modernizr/modernizr.js')
        .pipe(uglify())
        .pipe(gulp.dest(assetsDir + 'js/'));
});


/* Frontend Scripts Task
------------------------------------- */
gulp.task('frontendScripts', function () {
    var concatination = [
        bowerDir + 'jquery/dist/jquery.js',
        srcDir + 'js/frontend/navigation.js',
        srcDir + 'js/frontend/skip-link-focus-fix.js',
        srcDir + 'js/frontend/main.js'
    ];

    gulp.src(srcDir + 'js/frontend/*.js')
        .pipe(jslint({
            node: true,
            evil: true,
            nomen: true,
            errorsOnly: true
        })).on('error', function(error) {
            console.error(String(error));
        })
        .pipe(gulp.src(concatination))
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(assetsDir + 'js/frontend/'))
        .pipe(livereload());
});


/* Backend Scripts Task
------------------------------------- */
gulp.task('backendScripts', function () {
    var concatination = [
        srcDir + 'js/backend/main.js'
    ];

    gulp.src(srcDir + 'js/backend/*.js')
        .pipe(jslint({
            node: true,
            evil: true,
            nomen: true,
            errorsOnly: true
        })).on('error', function(error) {
            console.error(String(error));
        })
        .pipe(gulp.src(concatination))
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(assetsDir + 'js/backend/'))
        .pipe(livereload());
});


/* Clean Images task
------------------------------------- */
gulp.task('cleanImages', function () {
    return gulp.src(assetsDir + 'images', {read: false})
        .pipe(clean());
});


/* Images Task
------------------------------------- */
gulp.task('imagemin', ['cleanImages'], function () {
    gulp.src(srcDir + 'images/**/*.{png,gif,jpg,jpeg}')
        .pipe(imagemin())
        .pipe(gulp.dest(assetsDir + 'images/'));
});


/* Watch Task
------------------------------------- */
gulp.task('watch', function () {
    var server = livereload();

    gulp.watch(srcDir + 'scss/**/*.scss', ['sass']);
    gulp.watch(srcDir + 'js/frontend/**/*.js', ['frontendScripts']);
    gulp.watch(srcDir + 'js/backend/**/*.js', ['backendScripts']);
    gulp.watch(['**/*.php']).on('change', function (file) {
        server.changed(file.path);
    });
});


/* Default Task
------------------------------------- */
gulp.task('default', ['sass', 'modernizr', 'frontendScripts', 'backendScripts', 'imagemin', 'watch']);


/* Images Task
------------------------------------- */
gulp.task('images', ['imagemin']);
