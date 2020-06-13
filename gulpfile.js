const project_folder = 'dist';
const source_folder = 'src';
const path = {
	build: {
		html: './' + project_folder + '/',
		css: project_folder + '/css/',
		img: project_folder + '/img/',
		inject: './dist/css/*.min.css',
	},
	src: {
		html: './' + source_folder + '/index.html',
		css: source_folder + '/sass/*.sass',
		img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
	},
	watch: {
		html: source_folder + '/**/*.html',
		css: source_folder + '/sass/**/*.sass',
		img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
	},
	clean: './' + project_folder + '/',
};

const { src, dest } = require('gulp');
const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const del = require('del');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const groupmedia = require('gulp-group-css-media-queries');
const cleancss = require('gulp-clean-css');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const inject = require('gulp-inject');

function browserSync(params) {
	browsersync.init({
		server: {
			baseDir: './' + project_folder + '/',
		},
		port: 3000,
		notify: false,
	});
}

function html() {
	return src(path.src.html)
		.pipe(dest(path.build.html))
		.pipe(inject(src(path.build.inject, { read: false }), { relative: true }))
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream());
}

function images() {
	return src(path.src.img)
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3,
			})
		)
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream());
}

function css() {
	return src(path.src.css)
		.pipe(
			sass({
				outputStyle: 'expanded',
			}).on('error', sass.logError)
		)
		.pipe(groupmedia())
		.pipe(
			autoprefixer({
				overrideBrowserslist: ['last 5 versions'],
				cascade: true,
			})
		)
		.pipe(dest(path.build.css))
		.pipe(cleancss())
		.pipe(rename({ extname: '.min.css' }))
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream());
}

function watchFiles(params) {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.img], images);
}

function clean(params) {
	return del(path.clean);
}

const build = gulp.series(clean, gulp.parallel(css, images), html);
const watch = gulp.parallel(build, watchFiles, browserSync);

exports.watch = watch;
exports.build = build;
exports.default = watch;
