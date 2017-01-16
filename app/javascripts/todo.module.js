var Todo = angular.module('Todo', [
  'ui.router',
  'restangular'
]).run(
  function($rootScope) {
    $rootScope._ = _;
  }
);

module.exports = Todo;
