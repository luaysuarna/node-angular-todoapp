var Todo = require('Todo');

var AppController = Todo.controller('AppController', [
  '$rootScope',
  '$scope',
  'ngToast',
  '$cookies',
  'AuthService',
  '$state',
  'Restangular',
  function($rootScope, $scope, ngToast, $cookies, Auth, $state, Restangular) {

    /**
    * Local functions
    **/
    var signedInProcess = function(user) {
      $rootScope.setupSignedDefaultParams();
      $cookies.put('auth_token', user.auth_token);
      $rootScope.currentUser = user;
      $rootScope.userSignedIn = true;
      $state.go('todo');
    };
    var authenticateUser = function (event, toState) {
      if(toState.data.$requireLogin && !$rootScope.userSignedIn) {
        $state.go('home');
      }
    }
    var authenticateClear = function() {
      $cookies.remove('auth_token');
      $rootScope.currentUser = {};
      $rootScope.userSignedIn = false;
    }
    window.authenticateClear = authenticateClear;

    /**
    * $rootScope function libraries
    **/
    $rootScope.setupSignedDefaultParams = function () {
      return Restangular.setDefaultRequestParams(['get', 'remove', 'post', 'delete', 'put', 'patch'], { auth_token: $cookies.get('auth_token') })
    };
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState){
      authenticateUser(event, toState);
    })

    /**
    * First Init to Server
    **/
    if($rootScope.userSignedIn) {
      $rootScope.setupSignedDefaultParams();

      Auth.validate().then(
        function(response) {
          if(response.success) {
            signedInProcess(response.user);
          };
        }
      );
    }


    /**
    * $scope function libraries
    **/
    $scope.login = function(user) {
      Auth.login(user).then(
        function(response) {
          if(response.success) {
            ngToast.success("Welcome Back");
            signedInProcess(response.user);
          } else {
            ngToast.danger(response.message);
          }
        }
      );
    };
    $scope.logout = function(user) {
      Auth.logout(user).then(
        function(response) {
          if(response.success) {
            $state.go('home');
            $rootScope.currentUser = {};
            $rootScope.userSignedIn = false;
            $cookies.remove('auth_token');
          }
        }
      );
    }
  }]

);

module.exports = AppController;
