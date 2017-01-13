var Todo = require('Todo');

Todo.config([
  'RestangularProvider',
  function(RestangularProvider){
    RestangularProvider.setBaseUrl('http://localhost:3000/api/v1');
  }
]);

