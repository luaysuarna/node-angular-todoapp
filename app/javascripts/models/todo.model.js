var Todo = require('Todo');

var TodoModel = Todo.service('TodoModel', [
  'TaskService', function(TaskService) {
    
    const self = this;

    this.list = {}
    this.getList = function() {
      return TaskService.list(1).then(function(response) {
        self.list = response.tasks;
        return response;
      });
    }
  }
]);

module.exports = TodoModel;
