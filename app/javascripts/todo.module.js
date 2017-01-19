var Todo = angular.module('Todo', [
  'ui.router',
  'restangular',
  'ngSanitize',
  'ngToast',
  'ngCookies',
  'ngAria',
  'ngAnimate',
  'ngMaterial'
]).run(
  function($rootScope, $cookies) {
    /**
    * Init values
    **/
    $rootScope._ = _;
    $rootScope.userSignedIn = !_.isUndefined($cookies.get('auth_token'));
    $rootScope.currentUser  = {};
  }
);

module.exports = Todo;
