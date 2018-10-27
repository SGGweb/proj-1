var gulp = require('gulp'),
	sass = require('gulp-sass'),
	prefix = require('gulp-autoprefixer'),
	pug = require('gulp-pug'),
	data = require('gulp-data'),
	plumber =require('gulp-plumber'),
	uglify = require('gulp-uglify'),
	csscomb = require('gulp-csscomb'),  
	rename = require('gulp-rename'),
	prettify = require('gulp-html-prettify'),
	imagemin = require('gulp-imagemin'),
	browserSync = require('browser-sync'),
	reload      = browserSync.reload;

function requireUncached( $module) {
	delete require.cache[require.resolve( $module)];
	return require ( $module);
}

var config = {
	server: {
		baseDir: "app/"
	},
	tunnel: true,
	host: 'localhost',
	port: 9000,
	logPrefix: "localhost"

};

gulp.task('webserver',function(){
	browserSync(config);
});


gulp.task('images',function(){
	gulp.src(['app/images/*'])
	.pipe(imagemin())
	.pipe(gulp.dest('app/images/'));
});
gulp.task('styles', function(){
	gulp.src('app/sass/style.sass')
	.pipe(plumber())
	.pipe(sass({outputStyle:'expanded'}))
	.pipe(prefix())
	.pipe(csscomb())
	.pipe(gulp.dest('app/styles/'))
	.pipe(reload({stream: true}));
});

gulp.task('views', function(){
	gulp.src('app/views/*.pug')
	.pipe(plumber())
	.pipe(data(function(file){
		return requireUncached('./app/views/_data/data.json')
	}))
	.pipe(pug())
	.pipe(prettify({indent_char: ' ', indent_size: 4}))
	.pipe(gulp.dest('app/'))
	.pipe(reload({stream: true}));
});

gulp.task('watch', function(){
	gulp.watch('app/sass/**/*.sass', ['styles']);
	gulp.watch('app/views/**/*.pug', ['views']);
	gulp.watch('app/views/_data/data.json', ['views']);
});

gulp.task('scripts', function(){
      gulp.src(['app/js/*.js','!app/js/*min.js'])
      .pipe(uglify())
      .pipe(rename({
      	suffix: ".min"
      }))
      .pipe(gulp.dest('app/js'));
});


gulp.task('default', ['styles','views','watch','webserver',] );
gulp.task('final',['images','scripts'])