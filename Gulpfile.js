/* Modules
------------------------------------- */
var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    imagemin    = require('gulp-imagemin'),
    jslint      = require('gulp-jslint'),
    livereload  = require('gulp-livereload'),
    prefix      = require('gulp-autoprefixer'),
    sass        = require('gulp-ruby-sass'),
    uglify      = require('gulp-uglify');


/* Paths
------------------------------------- */
var assets      = 'assets/',
    jsDir       = assets + 'js/',
    imgDir      = assets + 'images/',
    srcDir      = assets + 'src/',
    scssSrcDir  = srcDir + 'scss/',
    jsSrcDir    = srcDir + 'js/',
    imgSrcDir   = srcDir + 'images/',
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


/* Modernizr Task
------------------------------------- */
gulp.task('modernizr', function () {
    gulp.src(bowerDir + 'modernizr/modernizr.js')
        .pipe(uglify())
        .pipe(gulp.dest(jsDir));
});


/* Frontend Scripts Task
------------------------------------- */
gulp.task('frontendScripts', function () {
    var concatination = [
        bowerDir + 'jquery/dist/jquery.js',
        jsSrcDir + 'frontend/navigation.js',
        jsSrcDir + 'frontend/skip-link-focus-fix.js',
        jsSrcDir + 'frontend/main.js'
    ];

    gulp.src(jsSrcDir + 'frontend/*.js')
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
        .pipe(gulp.dest(jsDir + 'frontend/'))
        .pipe(livereload());
});


/* Backend Scripts Task
------------------------------------- */
gulp.task('backendScripts', function () {
    var concatination = [
        jsSrcDir + 'backend/main.js'
    ];

    gulp.src(jsSrcDir + 'backend/*.js')
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
        .pipe(gulp.dest(jsDir + 'backend/'))
        .pipe(livereload());
});


/* Images Task
------------------------------------- */
gulp.task('images', function () {
    gulp.src(srcDir + 'images/**/*.{png,gif,jpg,jpeg}')
        .pipe(imagemin())
        .pipe(gulp.dest(assets + 'images/'))
        .pipe(livereload());
})


/* Watch Task
------------------------------------- */
gulp.task('watch', function () {
    var server = livereload();

    gulp.watch(scssSrcDir + '**/*.scss', ['sass']);
    gulp.watch(jsSrcDir + 'frontend/**/*.js', ['frontendScripts']);
    gulp.watch(jsSrcDir + 'backend/**/*.js', ['backendScripts']);
    gulp.watch(srcDir + 'images/**/*.{png,gif,jpg,jpeg}', ['images']);
    gulp.watch(['**/*.php']).on('change', function (file) {
        server.changed(file.path);
    });
});


/* Default Task
------------------------------------- */
gulp.task('default', ['sass', 'modernizr', 'frontendScripts', 'backendScripts', 'images', 'watch']);
