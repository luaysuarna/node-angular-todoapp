var Todo = require('Todo');

var BoardService = Todo.factory('BoardService', [
  'Restangular', function(Restangular){
    return {
      list: function() {
        return Restangular.one('boards').get();
      },
      search: function(query) {
        return Restangular.one('boards', 'search').get({query: query})
      },
      create: function(name) {
        return Restangular.one('boards').post(undefined, {board: { name: name}})
      }
    }
  }
]);

module.exports = BoardService;
