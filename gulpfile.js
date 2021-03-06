const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const rev = require("gulp-rev");
const uglify = require("gulp-uglify-es").default;
//const imagemin=require('gulp-imagemin');
const del = require("del");

gulp.task("css", function (done) {
  console.log("minifying css...");
  gulp
    .src("./assets/scss/**/*.scss")
    .pipe(sass())

    .pipe(gulp.dest("./assets/css"));

  gulp
    .src("./assets/**/*.css")
    .pipe(cssnano())
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest({
        cwd: "public",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));
  done();
});

// gulp.task("css", function (done) {
//   console.log("minifying css");
//   gulp
//     .src("./assets/**/*.css")
//     .pipe(cssnano())
//     .pipe(rev())
//     .pipe(gulp.dest("./public/assets"))
//     .pipe(
//       rev.manifest({
//         cwd: "public",
//         merge: true,
//       })
//     )
//     .pipe(gulp.dest("./public/assets"));
//   done();
// });

gulp.task("js", function (done) {
  console.log("minifying js");
  gulp
    .src("./assets/**/*.js")
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest("./public/assets/"))
    .pipe(
      rev.manifest({
        cwd: "public",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets/"));
  done();
});

gulp.task("image", function (done) {
  console.log("compressing images");
  gulp
    .src("./uploads/**/*.+(png|jpg|gif|svg|jpeg)")
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest("./public/assets/image"))
    .pipe(
      rev.manifest({
        cwd: "public",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets/image"));
  done();
});

gulp.task("clean:assets", function (done) {
  del.sync("./public/assets");
  done();
});

gulp.task("build", gulp.series("clean:assets", "css", "js"), function (done) {
  console.log("building assets");
  done();
});
