module.exports = {
  entry: './app/app.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
      Todo: 'app/todo.module.js',
      TodoConfig: 'app/config/config.js',
      TodoController: 'app/controllers/todo.controller.js',
      TodoService: 'app/services/todo.service.js'
    },
    extentions: ['', '.js']
  }
};
