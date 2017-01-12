var Todo = require('Todo');
require('restangular');

var TodoConfig = Todo.config [
  'RestangularProvider',
  function(RestangularProvider){
    RestangularProvider.setBaseUrl('http://localhost:3000/api/v1');
  }
]

