import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";

import imagemin from "gulp-imagemin";

const sass = gulpSass(dartSass);

const options = {
  quality: 50,
};

import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import sourcemaps from "gulp-sourcemaps";

export const css = () =>
  gulp
    .src("src/scss/app.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build/css"));

export const images = () =>
  gulp.src("src/img/**/*").pipe(imagemin(options)).pipe(gulp.dest("build/img"));

export const watchFiles = () => {
  gulp.watch("src/scss/**/*.scss", css);
  gulp.watch("src/img/**/*", images);
};

const build = gulp.series(images, css, watchFiles);

export default build;
