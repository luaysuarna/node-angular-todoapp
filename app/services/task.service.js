var Todo = require('Todo');

var TaskService = Todo.factory('TaskService', [
  'Restangular', function(Restangular) {
    return {
      create: function(task) {
        return Restangular.one('todos').post(void 0, {
          task: task
        });
      },
      list: function() {
        return Restangular.one('todos').get();
      },
      switchActive: function(task) {
        return Restangular.one("todos/" + task.id + "/activator").put();
      }
    };
  }
]);

module.exports = TaskService;
