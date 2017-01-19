var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    'script!jquery/dist/jquery.min.js',
    'script!bower_components/bootstrap/dist/js/bootstrap.min.js',
    'script!bower_components/selectize/dist/js/standalone/selectize.min.js',
    './app/app.js'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    }),
    new ExtractTextPlugin("./app/style.css")
  ],
  output: {
    path: __dirname,
    filename: './app/bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
      AppController: 'app/javascripts/controllers/app.controller.js',
      AuthService: 'app/javascripts/services/auth.service.js',

      Todo: 'app/javascripts/todo.module.js',
      TodoConfig: 'app/javascripts/config/config.js',
      TodoConfigRoutes: 'app/javascripts/config/routes.js',
      TodoController: 'app/javascripts/controllers/todo.controller.js',
      TaskService: 'app/javascripts/services/task.service.js',

      BoardService: 'app/javascripts/services/board.service.js'
    },
    extentions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader") 
      }
    ]
  }
};
