var gulp = require('gulp');
var del = require('del');
var inject = require('gulp-inject');
var browserSync = require('browser-sync');

var concat = require('gulp-concat');

var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');

//var jshint = require('gulp-jshint');
var sourceMaps = require('gulp-sourcemaps');

var karma = require('gulp-karma');

//=========================================== configs ===========================================

var config = {
    jsSource: [
        'src/app.js',
        'src/components/**/*.js'
    ],
    cssSource: [
        'src/css/**/*.css'
    ],
    bowerJsForTest: [
        'bower_components/angular-mocks/angular-mocks.js'
    ],
    jsTestSource: [
        'test/**/*.js'
    ]
};

var devConfig = {
    libFolder: 'src/lib',

    bowerJs: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/bootstrap/dist/js/bootstrap.js'
    ],
    bowerCss: [
        'bower_components/bootstrap/dist/css/bootstrap.css'
    ],
    libJs: [
        'src/lib/jquery.js',
        'src/lib/angular.js',
        'src/lib/angular-route.js',
        'src/lib/**/*.js'
    ],
    libCss: [
        'src/lib/**/*.css'
    ]
};

var productionConfig = {
    libFolder: 'productionApp/lib',
    bowerJs: [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/angular/angular.min.js',
        'bower_components/angular-route/angular-route.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js'
    ],
    bowerCss: [
        'bower_components/bootstrap/dist/css/bootstrap.min.css'
    ],
    libJs: [
        'productionApp/lib/jquery.min.js',
        'productionApp/lib/angular.min.js',
        'productionApp/lib/angular-route.min.js',
        'productionApp/lib/**/*.js'
    ],
    libCss: [
        'productionApp/lib/**/*.css'
    ],
    js: [
        'productionApp/**/*.js'
    ],
    css: [
        'productionApp/lib/**/*.css'
    ]
};

//=========================================== helpers ===========================================

function copy(srcMask, destFolder) {
    return gulp.src(srcMask).pipe(gulp.dest(destFolder))
}

function bower2lib(bowerSources, libFolder) {
    del.sync(libFolder + '/*');
    return copy(bowerSources, libFolder);
}

function fillIndex(sources, destination) {
    var gulpedSources = gulp.src(sources, {read: false});

    return gulp.src('src/index.html')
        .pipe(gulp.dest(destination))
        .pipe(inject(gulpedSources, {relative: true}))
        .pipe(gulp.dest(destination));
}

//==================================== developer environment ====================================

gulp.task('dev.libs2sources', function() {
    var bowerSources = devConfig.bowerJs.concat(devConfig.bowerCss);
    return bower2lib(bowerSources, devConfig.libFolder);
});

gulp.task('dev.sources2index', function() {
    var sources = devConfig.libJs
        .concat(config.jsSource)
        .concat(devConfig.libCss)
        .concat(config.cssSource);

    return fillIndex(sources, 'src')
});

gulp.task('dev.browserSync.reload', gulp.series('dev.sources2index', browserSync.reload));

gulp.task('dev.watch', function() {
    gulp.watch('src/**/*', ['dev.browserSync.reload']);
    gulp.watch('bower_components/**/*', [gulp.series('dev.libs2sources', 'dev.browserSync.reload')]);
});
    
gulp.task('dev.browserSync.start', function() {
    browserSync({
        server: {
            baseDir: './src/'
        },
        port: 9090,
        https: false,
        ui: {
            port: 9091
        },
        browser: 'google-chrome-stable'
    });
});

gulp.task('dev.startTestEnvironment', function() {
    gulp.src(
        devConfig.bowerJs
            .concat(config.bowerJsForTest)
            .concat(config.jsSource)
            .concat(config.jsTestSource)
    )
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'watch'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
});

gulp.task('dev', gulp.series('dev.libs2sources', 'dev.sources2index', gulp.parallel('dev.browserSync.start', 'dev.startTestEnvironment', 'dev.watch')));

//==================================== production environment ===================================

gulp.task('production.libs2pack', function() {
    var bowerSources = productionConfig.bowerJs.concat(productionConfig.bowerCss);
    return bower2lib(bowerSources, productionConfig.libFolder);
});

gulp.task('production.js2pack', function() {
    return gulp.src(config.jsSource)
        .pipe(sourceMaps.init())
        //.pipe(jshint())
        //.pipe(jshint.reporter('default'))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(sourceMaps.write('js-maps'))
        .pipe(gulp.dest('productionApp'))
});

gulp.task('production.css2pack', function() {
    return gulp.src(config.cssSource)
        .pipe(sourceMaps.init())
        .pipe(concat('app.css'))
        .pipe(minifyCSS())
        .pipe(sourceMaps.write('css-maps'))
        .pipe(gulp.dest('productionApp'))
});

gulp.task('production.index2pack', function() {
    var addToIndexSources =
        productionConfig.libJs
            .concat(productionConfig.libCss)
            .concat(productionConfig.js)
            .concat(productionConfig.css);
    var indexDestination = 'productionApp';

    return fillIndex(addToIndexSources, indexDestination)
        .pipe(minifyHTML())
        .pipe(gulp.dest(indexDestination));
});

gulp.task('production.html2pack', function() {
    return gulp.src('src/components/**/*.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('productionApp/components'));
});

gulp.task('production.clean', function(callback) {
    del('productionApp/*', callback);
});

gulp.task('production.test', function() {
    var productionTestSources = productionConfig.libJs
        .concat(config.bowerJsForTest)
        .concat(productionConfig.js)
        .concat(config.jsTestSource);

    gulp.src(productionTestSources)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
});

gulp.task('production', gulp.series('production.clean', gulp.parallel('production.libs2pack', 'production.js2pack', 'production.css2pack', 'production.html2pack'),
    'production.index2pack', 'production.test'));
