var Todo = require('Todo');

var TodoController = Todo.controller('TodoController', [
  '$rootScope', '$scope', 'TaskService', '$cookies', function($rootScope, $scope, Task, $cookies) {
    /**
    * Init Value
    **/
    var checkNewTask, toggleStatusTask;
    $scope.title = "Todo Application";
    $scope.hideDone = true;
    $scope.needEnter = false;

    /**
    * Authentications Init
    **/
    if($rootScope.userSignedIn) {
      $rootScope.setupSignedDefaultParams();
      
      Task.list().then(function(response) {
        $scope.tasks = response.tasks;
      });
    }

    /**
    * $scope Function libraries
    **/
    $scope.addTask = function(task) {
      Task.create(task).then(function(response) {
        if (response.success) {
          return $scope.tasks.push(response.task);
        }
      });
      $scope.newTask = {};
      return $scope.needEnter = false;
    };
    $scope.switchDone = function(index, e) {
      var $el, $wrapper;
      $el = $(e.currentTarget);
      $wrapper = $el.closest('li');
      return toggleStatusTask($scope.tasks[index]).then(function(response) {
        if ($el.is(':checked')) {
          return $scope.tasks[index]['done'] = true;
        }
      });
    };
    $scope.switchActive = function(index, e) {
      return toggleStatusTask($scope.tasks[index]).then(function(response) {
        return $scope.tasks[index]['done'] = false;
      });
    };
    $scope.toggleShowDone = function() {
      var ref;
      return $scope.hideDone = (ref = $scope.hideDone === false) != null ? ref : {
        "true": false
      };
    };
    $scope.$watch('newTask.name', function(value) {
      return checkNewTask(value);
    });

    /**
    * Local Function
    **/
    checkNewTask = function(value) {
      if (!_.isUndefined(value)) {
        if (value.length) {
          return $scope.needEnter = true;
        } else {
          return $scope.needEnter = false;
        }
      }
    };
    toggleStatusTask = function(task) {
      return Task.switchActive(task);
    };
  }
]);

module.exports = TodoController;
