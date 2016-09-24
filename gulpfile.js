require('babel-polyfill');

const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const del = require('del');
const crx = require('gulp-crx-pack');
const fs = require('fs');

const webpackConf = require('./webpack.config.js');
const js = './src/*.js';
const css = './src/css/*.css';
const src = './src/**/*';
const excluedJS = '!./src/*.js';
const build = './build';
const pem = './build.pem';
const pack = 'zhihu-like-analyzer.crx';

gulp.task('clean', () => {
    return del([build]);
});

gulp.task('copy', ['clean'], (cb) => {
    gulp.src([src, excluedJS]).pipe(gulp.dest(build));
    cb();
});

gulp.task('webpack', ['clean'], (cb) => {
    webpack(webpackConf, (err, stats) => {
        if (err) {
            throw new gutil.PluginError('[webpack]', err);
        } else {
            gutil.log('[webpack]', stats.toString());
            cb();
        }
    });
});

gulp.task('build', ['clean', 'copy', 'webpack'], (cb) => {
    gulp.src(build)
        .pipe(crx({
            privateKey: fs.readFileSync(pem, 'utf8'),
            filename: pack}))
        .pipe(gulp.dest(build));
    cb();
});
gulp.task('crx', function() {
    return
});


gulp.task('watch', function () {
    gulp.watch(css, ['webpack']);
    gulp.watch(js, ['webpack']);
});
gulp.task('default', ['build']);
