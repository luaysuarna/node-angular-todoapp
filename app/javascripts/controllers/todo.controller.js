var Todo = require('Todo');

var TodoController = Todo.controller('TodoController', [
  '$rootScope', 
  '$scope', 
  'TaskService', 
  '$cookies', 
  'BoardService',
  'ngToast',
  'ActionCableChannel',
  function($rootScope, $scope, Task, $cookies, Board, ngToast, ActionCableChannel) {
    /**
    * Init Value
    **/
    var checkNewTask, toggleStatusTask;
    $scope.title = "Todo Application";
    $scope.hideDone = true;
    $scope.needEnter = false;
    $scope.searchText = null;

    /**
    * $scope Function libraries
    **/
    $scope.selectedBoard = function(board) {
      getTasks(board);
    }
    $scope.queryBoard = function(query) {
      return Board.search(query).then(
        function(response){
          return response.boards;
        }
      );
    };
    $scope.newBoard = function(name) {
      Board.create(name).then(
        function(response){
          if(response.success){
            $scope.currentBoard = response.board;
            ngToast.success(response.message);
          } else {
            ngToast.danger(response.message);
          }
        }
      );
    };
    $scope.addTask = function(task) {
      if(_.isObject($scope.currentBoard)){
        Task.create(task, $scope.currentBoard.id).then(function(response) {
          if (response.success) {
            return $scope.tasks.push(response.task);
          }
        });
        $scope.newTask = {};
        return $scope.needEnter = false;
      } else {
        ngToast.danger('Please choose your card first!');
      }
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
    $scope.$watch('searchText', function(value) {
      $scope.tasks = [];
    });
    $scope.$watch('currentBoard', function(value) {
      if(_.isObject(value)){
        Task.list(value).then(function(response) {
          $scope.tasks = response.tasks;
        });
      }
    });

    /**
    * Setup Action Cable
    **/
    var consumer = new ActionCableChannel('NotificationChannel');
    var callback = function(response) {
      ngToast.success(response.message);

      if(_.isObject(response.task)){
        var task = response.task;
        if(task.board_id === $scope.currentBoard.id) {
          $scope.tasks.push(task);
        }
      }
    };
    consumer.subscribe(callback).then(
      function() {
        $rootScope.$watch('userSignedIn', function(value){
          if(!value){
            consumer.unsubscribe()
          }
        });
      }
    );;

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
    createFilterFor = function (query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return _.includes(state.name.toLowerCase(), lowercaseQuery);
      };
    };
    getTasks = function(board)  {
      if(_.isObject(board)) {
        $scope.currentBoard = board;
      }
    };

  }
]);

module.exports = TodoController;
