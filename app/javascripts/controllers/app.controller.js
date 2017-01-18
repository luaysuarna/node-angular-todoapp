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
      setupSignedDefaultParams();
      $rootScope.userSignedIn = true;
      $cookies.put('auth_token', user.auth_token);
      $rootScope.currentUser = user;
      $state.go('todo');
    };
    var setupSignedDefaultParams = function () {
      return Restangular.setDefaultRequestParams(['get', 'remove', 'post', 'delete', 'put', 'patch'], { auth_token: $cookies.get('auth_token') })
    };
    var authenticateUser = function (event) {
      if(!$rootScope.userSignedIn) {
        event.preventDefault()
        $state.go('home');
      }
    }

    /**
    * First Init to Server
    **/
    if($rootScope.userSignedIn) {
      setupSignedDefaultParams();

      Auth.validate().then(
        function(response) {
          if(response.success) {
            signedInProcess(response.user);
          };
        }
      );
    }

    /**
    * $rootScope function libraries
    **/
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState){
      if(toState.name !== 'home') {
        authenticateUser(event);
      }
    })

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
