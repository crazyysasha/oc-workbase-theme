let mix = require('laravel-mix');

mix.js('src/js/app.js', 'assets/js')
    // .postCss()
    .postCss('src/css/app.css', 'assets/css', [
        require('tailwindcss'),
        require('autoprefixer')
    ])
    .setPublicPath("/")
    .browserSync({
        proxy: "http://october.loc",
        files: [
            '../*/partials/**/*.*',
            '../*/content/**/*.*',
            '../*/pages/**/*.*',
            '../*/layouts/**/*.*',
            '../*/src/**/*.*',
        ],
    });
