const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

// Compile sass into CSS, auto-inject into browsers, auto-prefixes + concatination sass(css)'s files
function style(done) {
	gulp
		.src(['src/sass/*.sass', '!src/sass/_*.sass'])
		.pipe(
			sass({
				errLogToConsole: true,
			})
		)
		.on('error', console.error.bind(console))
		.pipe(autoprefixer({ cascade: false }))
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.stream());
	done();
}

// Static Server + watching scss/html files
function watch(done) {
	browserSync.init({
		server: 'src/',
	});
	gulp.watch('src/sass/*.sass', style);
	gulp.watch('src/*.html').on('change', () => {
		browserSync.reload();
		done();
	});
	gulp.watch('src/js/*.js').on('change', () => {
		browserSync.reload();
		done();
	});
	done();
}

exports.default = gulp.series(watch, style);
