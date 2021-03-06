var Todo = require('Todo');

Todo.config([
  '$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    var homeState, todoState;

    homeState = {
      name: 'home',
      url: '/',
      controller: 'AppController',
      templateUrl: 'views/homes/index.html',
      data: {
        $requireLogin: false
      }
    };
    todoState = {
      name: 'todo',
      url: '/todos',
      controller: 'TodoController',
      templateUrl: 'views/todos/index.html',
      data: {
        $requireLogin: true
      }
    };

    $stateProvider.state(homeState);
    $stateProvider.state(todoState);
    $urlRouterProvider.otherwise('/');

    return $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }
]);
