var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    del = require('del'),
    runSequence = require('run-sequence');

    gulp.task('sass', function(){
        return gulp.src('./src/sass/app.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/sass'))
        .pipe(browserSync.reload({
            stream: true
        }));
    });

    gulp.task('browserSync', function() {
        browserSync.init({
            server: {
                baseDir: 'src'
            }
        });
    });

    gulp.task('useref', function(){
        return gulp.src('src/*.html')
            .pipe(useref())
            .pipe(gulpIf('*.js', uglify()))
            .pipe(gulpIf('*.css', cssnano()))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('clean:dist', function() {
        return del.sync('dist');
    });

    gulp.task('build', function (callback) {
        runSequence('clean:dist',
            ['sass', 'useref'],
            callback);
    });

    gulp.task('default', function (callback) {
        runSequence(['sass','browserSync', 'watch'],
            callback
        );
    });

    gulp.task('watch', ['browserSync', 'sass'], function(){
        gulp.watch('src/sass/*.scss', ['sass']);
        gulp.watch('src/*.html', browserSync.reload);
        gulp.watch('src/scripts/**/*.js', browserSync.reload);
    });
