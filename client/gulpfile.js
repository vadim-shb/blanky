var gulp = require('gulp');
var del = require('del');
var inject = require('gulp-inject');
var browserSync = require('browser-sync');

var concat = require('gulp-concat');

var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');

var jshint = require('gulp-jshint');
var sourceMaps = require('gulp-sourcemaps');

//==================================== developer environment ====================================

function copy(srcMask, destFolder) {
    return gulp.src(srcMask).pipe(gulp.dest(destFolder))
}

gulp.task('dev.cleanLibraries', function() {
    del.sync('src/main/lib/*');
    var emptyStream = gulp.src([]).pipe(gulp.dest('/'));
    return emptyStream;
});

gulp.task('dev.libs2sources', function() {
    del.sync('src/main/lib/*');
    copy('bower_components/jquery/dist/jquery.js', 'src/main/lib/jquery');
    copy('bower_components/angular/angular.js', 'src/main/lib/angular');
    copy('bower_components/angular-route/angular-route.js', 'src/main/lib/angular');
    copy('bower_components/bootstrap/dist/js/bootstrap.js', 'src/main/lib/bootstrap/js');
    return copy('bower_components/bootstrap/dist/css/bootstrap.css', 'src/main/lib/bootstrap/css');
});

gulp.task('dev.sources2index', function() {
    var sources = gulp.src([
        'src/main/lib/jquery/jquery.js',
        'src/main/lib/angular/angular.js',
        'src/main/lib/angular/angular-route.js',
        'src/main/lib/**/*.js',
        'src/main/**/*.js',
        'src/main/lib/bootstrap/css/bootstrap.css',
        'src/main/css/**/*.css'
    ], {read: false});

    return gulp.src('src/main/index.html')
        .pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('src/main'));
});

gulp.task('dev.reload', gulp.series('dev.sources2index', browserSync.reload));

gulp.task('dev.browserSync.start', function() {
    browserSync({
        server: {
            baseDir: './src/main/'
        },
        port: 9090,
        https: true,
        ui: {
            port: 9091
        },
        browser: 'google-chrome-stable'
    });
    gulp.watch('src/main/**/*', 'dev.reload');
    gulp.watch('bower_components/**/*', gulp.series('dev.cleanLibraries', 'dev.libs2sources', 'dev.reload'));
});

gulp.task('dev', gulp.series('dev.libs2sources', 'dev.sources2index', 'dev.browserSync.start'));

//==================================== production environment ===================================

gulp.task('production.clear', function() {
    return del.sync('productionApp/*');
});

gulp.task('production.libs2pack', function() {
    copy('bower_components/jquery/dist/jquery.min.js', 'productionApp/lib');
    copy('bower_components/angular/angular.min.js', 'productionApp/lib');
    copy('bower_components/angular-route/angular-route.min.js', 'productionApp/lib');
    copy('bower_components/bootstrap/dist/js/bootstrap.min.js', 'productionApp/lib');
    return copy('bower_components/bootstrap/dist/css/bootstrap.min.css', 'productionApp/lib');
});

gulp.task('production.js2pack', function() {
    return gulp.src('src/main/app/**/*.js')
        .pipe(sourceMaps.init())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(sourceMaps.write('js-maps'))
        .pipe(gulp.dest('productionApp'))
});

gulp.task('production.css2pack', function() {
    return gulp.src('src/main/css/**/*.css')
        .pipe(sourceMaps.init())
        .pipe(concat('app.css'))
        .pipe(minifyCSS())
        .pipe(sourceMaps.write('css-maps'))
        .pipe(gulp.dest('productionApp'))
});

gulp.task('production.index2pack', function() {
    var sources = gulp.src([
        'productionApp/**/jquery.js',
        'productionApp/**/angular.js',
        'productionApp/**/angular-route.js',
        'productionApp/**/*.js',
        'productionApp/**/*.css'
    ], {read: false});

    return gulp.src('src/main/index.html')
        .pipe(gulp.dest('productionApp'))
        .pipe(inject(sources, {relative: true}))
        .pipe(minifyHTML())
        .pipe(gulp.dest('productionApp'));
});

gulp.task('production.clean', function(callback) {
    del('productionApp/*', callback);
});

gulp.task('production', gulp.series('production.clean', gulp.parallel('production.libs2pack', 'production.js2pack', 'production.css2pack'), 'production.index2pack'));
