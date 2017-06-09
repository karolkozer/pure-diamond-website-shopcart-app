var gulp = require("gulp");
var uglify = require("gulp-uglify"); // compress file without spaces
var livereload = require("gulp-livereload");
var plumber = require("gulp-plumber");
var autoprefixer = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps"); // know how file looks before and after
var sass = require("gulp-sass");
var concat = require("gulp-concat"); // compress files into one
var del = require("del");

// Images
var imagemin = require("gulp-imagemin");
var imageminPngquant = require("imagemin-pngquant");

// File Path
var DIST_PATH = "public/dist";
var SCRIPTS_PATH = "public/scripts/**/*.js";
var IMAGES_PATH = "public/img/**/*.png";

// HTML
gulp.task("html", function() {
    
    return gulp.src("public/**/*.html")
        .pipe(livereload());
});

// Styles
gulp.task("styles", function() {
    
    return gulp.src("public/scss/styles.scss")
        .pipe(plumber(function(err) {
            console.log("Styles Task Error");
            console.log(err);
            this.emit("end");
        }))
        .pipe(sourcemaps.init()) // before changes
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write()) // write sourcemapsin a new file
        .pipe(gulp.dest(DIST_PATH))
        .pipe(livereload());
});

// Scripts
gulp.task("scripts", function() {
    
    return gulp.src(["node_modules/jquery/dist/jquery.min.js", SCRIPTS_PATH])
        .pipe(plumber(function(err) {
            console.log("Script Task Error");
            console.log(err);
            this.emit("end");
        }))
        .pipe(sourcemaps.init()) // before changes
        .pipe(uglify())
        .pipe(concat("scripts.js"))
        .pipe(sourcemaps.write()) // write sourcemapsin a new file
        .pipe(gulp.dest(DIST_PATH))
        .pipe(livereload());
});

// Images
gulp.task("img", function() {
    
    return gulp.src(IMAGES_PATH)
        .pipe(imagemin([
            imagemin.optipng(),
            imageminPngquant()
        ]))
        .pipe(gulp.dest(DIST_PATH + "/images"));
});

// Clean
gulp.task("clean", function() {
    return del.sync([
        DIST_PATH
    ])
});

// Default
gulp.task("default", ["clean", "html", "styles", "scripts", "img"], function() {
    console.log("Starting default task");
});

// Watch
gulp.task("watch", ["default"], function() {
    
    require("./server.js");
    livereload.listen();
    gulp.watch("public/**/*.html", ["html"]);
    gulp.watch(SCRIPTS_PATH, ["scripts"]);
    gulp.watch("public/scss/**/*.scss", ["styles"]);
});





