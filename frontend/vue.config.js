const path = require('path');

module.exports = {
    chainWebpack: config => {
        config.plugin('html').tap(args => {
          args[0].title = 'Portfolio';
          return args;
        })
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000'
            }
        }
    },
    outputDir: path.resolve(__dirname, '../server/public'),
    pluginOptions: {
      i18n: {
        locale: 'en',
        fallbackLocale: 'en',
        localeDir: 'locales'
      }
    }
};
