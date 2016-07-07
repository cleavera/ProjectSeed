var gulp = require('gulp'),
    ts = require('gulp-typescript');

gulp.task('~compile:node', function() {
    return gulp.src('src/**/*.node.ts')
        .pipe(ts({
            module: "commonjs",
            target: "ES6",
            experimentalDecorators: true
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('~compile', [
    "~compile:node"
]);

gulp.task('build', [
    '~compile'
]);
