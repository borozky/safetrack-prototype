let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.js('js/main.js', 'dist/js/main.bundle.js')
    .sass('scss/main.scss', 'dist/css/main.bundle.css')
    .browserSync({
        proxy: "http://localhost:8000",
        files: [
            './*.html',
            './dist/**/*.*',
        ]
    })
    .options({
        autoprefixer: {
            options: {
                overrideBrowserslist: [
                    'last 6 versions',
                ]
            }
        }
   });
