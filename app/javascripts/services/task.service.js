var Todo = require('Todo');

var TaskService = Todo.factory('TaskService', [
  'Restangular', function(Restangular) {
    return {
      create: function(task, boardId) {
        return Restangular.one('todos').post(void 0, {
          task: angular.extend(task, { board_id: boardId })
        });
      },
      list: function(board) {
        return Restangular.one('todos').get({ board_id: board.id });
      },
      switchActive: function(task) {
        return Restangular.one("todos/" + task.id + "/activator").put();
      }
    };
  }
]);

module.exports = TaskService;
