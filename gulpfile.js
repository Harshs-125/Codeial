const gulp=require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano=require('gulp-cssnano');
const rev=require('gulp-rev');
const uglify=require('gulp-uglify-es').default;

gulp.task('css',function(done){
    console.log("minifying css");
    gulp.src('./assets/scss/**/*.scss')
     .pipe(sass())
     .pipe(cssnano())
     .pipe(rev())
     .pipe(gulp.dest('./public/assets/css'))
     .pipe(rev.manifest({
         cwd:'public',
         merge:true
     }))
     .pipe(gulp.dest('./public/assets/css'));
     done();
});

gulp.task('js',function(done){
    console.log('minifying js');
    gulp.src('./assets/**/*.js')
     .pipe(uglify())
     .pipe(rev())
     .pipe(gulp.dest('./public/assets/js'))
     .pipe(rev.manifest({
         cwd:'public',
         merge:true
     }))
     .pipe(gulp.dest('./public/assets/js'));
     done();
})
