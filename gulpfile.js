const gulp=require('gulp');
const babel=require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('default', (done) =>{
  gulp.src('./index.js')
      .pipe(babel({
        presets: ['@babel/env'],
      }))
      .pipe(uglify())
      .pipe(gulp.dest('lib'));
  gulp.src('./constant.js')
      .pipe(babel({
        presets: ['@babel/env'],
      }))
      .pipe(uglify())
      .pipe(gulp.dest('lib'));
  done();
});
