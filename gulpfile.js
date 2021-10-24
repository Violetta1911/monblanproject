const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');

function images() {
	return src('docs/images/**/*')
		.pipe(
			imagemin([
				imagemin.gifsicle({ interlaced: true }),
				imagemin.mozjpeg({ quality: 75, progressive: true }),
				imagemin.optipng({ optimizationLevel: 5 }),
				imagemin.svgo({
					plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
				}),
			]),
		)
		.pipe(dest('dist/images'));
}

function styles() {
	return src([
		'node_modules/normalize.css/normalize.css',
		'node_modules/slick-carousel/slick/slick.css',
		'node_modules/slick-carousel/slick/slick-theme.css',
		'docs/scss/style.scss',
	])
		.pipe(scss({ outputStyle: 'compressed' }))
		.pipe(concat('style.min.css'))
		.pipe(
			autoprefixer({
				overrideBrowserslist: ['last 8 versions'],
			}),
		)
		.pipe(dest('docs/css'))
		.pipe(browserSync.stream());
}

function scripts() {
	return src(['node_modules/jquery/dist/jquery.js', 'docs/js/main.js'])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest('docs/js'))
		.pipe(browserSync.stream());
}

function build() {
	gulp;
	return src(
		[
			'docs/css/style.min.css',
			'docs/fonts/**/*',
			'docs/js/main.min.js',
			'docs/*.html',
		],
		{ base: 'docs' },
	).pipe(dest('dist'));
}

function cleandist() {
	return del('dist');
}

function watching() {
	watch(['docs/scss/**/*.scss'], styles);
	watch(['docs/*.html']).on('change', browserSync.reload);
	watch(['docs/js/**/*.js', '!docs/js/main.min.js'], scripts);
}

function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'docs/',
		},
	});
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.images = images;

exports.build = series(cleandist, images, build);
exports.default = parallel(browsersync, watching, scripts);
