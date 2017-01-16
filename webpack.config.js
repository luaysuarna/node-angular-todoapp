var webpack = require('webpack');

module.exports = {
  entry: [
    'script!jquery/dist/jquery.min.js',
    './app/app.js'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    })
  ],
  output: {
    path: __dirname,
    filename: './bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
      Todo: 'app/javascripts/todo.module.js',
      TodoConfig: 'app/javascripts/config/config.js',
      TodoConfigRoutes: 'app/javascripts/config/routes.js',
      TodoController: 'app/javascripts/controllers/todo.controller.js',
      TaskService: 'app/javascripts/services/task.service.js'
    },
    extentions: ['', '.js']
  },
  module: {
    loaders: []
  }
};
