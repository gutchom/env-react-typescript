const webpackConf = require('./webpack.config.js')
delete webpackConf.entry
webpackConf.externals = {
  'react/addons': 'react',
  'react/lib/ExecutionEnvironment': 'react',
  'react/lib/ReactContext': 'react',
}

module.exports = function(config) {
  config.set({
    basePath: './src/scripts',
    frameworks: ['power-assert', 'mocha', 'es6-shim'],
    browsers: ['PhantomJS'],
    files: [
      'test/**/*.test.ts',
      'test/**/*.test.tsx',
    ],
    plugins: [
      'karma-power-assert',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-coverage',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-sourcemap-writer',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-es6-shim',
    ],
    preprocessors: {
      'test/**/*.test.ts': ['webpack', 'sourcemap'],
      'test/**/*.test.tsx': ['webpack', 'sourcemap'],
    },
    port: 9876,
    concurrency: Infinity,
    singleRun: false,
    reporters: ['mocha'],
    mochaReporter: {
      colors: true,
    },
    browserConsoleLogOptions: {
      level: '',
      terminal: true,
    },
    loggers: [
      { type: 'console'},
    ],
    logLevel: config.LOG_INFO,
    webpack: webpackConf,
    webpackMiddleware: {
      stats: 'errors-only',
    },
  })
}
