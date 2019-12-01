const
mix = require(`laravel-mix`), //laravel-mix本体
StyleLintPlugin = require(`stylelint-webpack-plugin`), // stylelintを使う
glob = require(`glob`); //globを使う

const dist_path = `docs/`;
/*
  |--------------------------------------------------------------------------
  | Mix Asset Management
  |--------------------------------------------------------------------------
  |
  | Mix provides a clean, fluent API for defining some Webpack build steps
  | for your Laravel application. By default, we are compiling the Sass
  | file for the application as well as bundling up all the JS files.
  |
 */

mix.webpackConfig({
  module: {
    rules: [{
      test: /\.scss$/,
      loader: `import-glob-loader`
    }]
  },
  plugins: [
    new StyleLintPlugin({
      fix: true
    })
  ]
})

mix.js(`src/@js/main.js`, `${dist_path}assets/js`)
  .extract([`vue`, `axios`, `lodash`,`what-input`])
  .autoload({
    vue: [`Vue`, `window.Vue`],
    axios: `axios`,
    lodash: `_`
  });

mix.sass(`src/@scss/common.scss`, `${dist_path}assets/css`)
  .options({
    processCssUrls: false,
    postCss: [
      require(`autoprefixer`)({grid: `autoplace`}),
      require(`css-mqpacker`)
    ],
  });

const entrieslist = glob.sync(`**/*.scss`, {
  ignore: `**/_*.scss`,
  cwd: `./src/@scss/page`
});

entrieslist.forEach((value,_index,_array) => {
  const dir = value.replace(/style\.scss$/, ``);
  mix.sass(`src/@scss/page/${value}`, `${dist_path}assets/css/${dir}`);
})

mix.sourceMaps()
mix.webpackConfig({
  devtool: `inline-source-map`
});

mix.copy(`src/index.html`, `${dist_path}`);
mix.copyDirectory(`src/img`, `${dist_path}assets/img`);
mix.disableNotifications();

mix.browserSync({
  server: `docs`,
  proxy: false,
  files: [
    `docs/index.html`,
    `docs/**/*.js`,
    `docs/**/*.css`
  ]
})