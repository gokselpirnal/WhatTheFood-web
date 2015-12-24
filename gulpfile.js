var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    wrap = require('gulp-wrap'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    minifyCss = require('gulp-minify-css'),
    minifyJs = require('gulp-uglify'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    minifyHTML = require('gulp-minify-html');

var paths = {
    scripts: 'public/js/**/*.*',
    styles: 'public/less/**/*.*',
    images: 'public/img/**/*.*',
    templates: 'public/templates/**/*.html',
    index: 'public/index.html',
    bower_fonts: 'public/components/**/*.{ttf,woff,eof,svg}'
};

/**
 * Handle bower components from index
 */
gulp.task('usemin', function () {
    return gulp.src(paths.index)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [minifyCss({keepSpecialComments: 0}), 'concat']
        }))
        .pipe(gulp.dest('public/dist/'));
});

/**
 * Copy assets
 */
gulp.task('build-assets', ['copy-bower_fonts']);

gulp.task('copy-bower_fonts', function () {
    return gulp.src(paths.bower_fonts)
        .pipe(rename({
            dirname: '/fonts'
        }))
        .pipe(gulp.dest('public/dist/lib'));
});

/**
 * Handle custom files
 */
gulp.task('build-custom', ['custom-images', 'custom-js', 'custom-less', 'custom-templates']);

gulp.task('custom-images', function () {
    return gulp.src(paths.images)
        .pipe(gulp.dest('public/dist/img'));
});

gulp.task('custom-js', function () {
    return gulp.src([
        "public/js/**/*.*"
    ])
        .pipe(minifyJs())
        .pipe(concat('wtf.min.js'))
        .pipe(gulp.dest('public/dist/js'));
});

gulp.task('custom-css', function () {
    return gulp.src([
        "stylesheets/*.css"
    ])
        .pipe(minifyJs())
        .pipe(concat('core.min.css'))
        .pipe(gulp.dest('public/dist/css'));
});


gulp.task('custom-less', function () {
    return gulp.src(paths.styles)
        .pipe(less())
        .pipe(gulp.dest('public/dist/css'));
});

gulp.task('custom-templates', function () {
    return gulp.src(paths.templates)
        .pipe(minifyHTML())
        .pipe(gulp.dest('public/dist/templates'));
});

/**
 * Watch custom files
 */
gulp.task('watch', function () {
    gulp.watch([paths.images], ['custom-images']);
    gulp.watch([paths.styles], ['custom-less']);
    gulp.watch([paths.scripts], ['custom-js']);
    gulp.watch([paths.templates], ['custom-templates']);
    gulp.watch([paths.index], ['usemin']);
});


/**
 * Live reload server
 */
gulp.task('webserver', function () {
    connect.server({
        root: 'public/dist',
        livereload: true,
        port: 8888
    });
});

gulp.task('livereload', function () {
    gulp.src(['public/dist/**/*.*'])
        .pipe(watch())
        .pipe(connect.reload());
});

/**
 * Gulp tasks
 */
gulp.task('build', ['usemin', 'build-assets', 'build-custom', 'custom-css']);
gulp.task('default', ['build', 'livereload', 'watch']);