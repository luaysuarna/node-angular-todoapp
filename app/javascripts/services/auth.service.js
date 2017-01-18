var Todo = require('Todo');

var AuthService = Todo.factory('AuthService', [
  'Restangular', function(Restangular) {
    return {
      login: function(user) {
        if(_.isEmpty(user)){
          user = { email: '' }
        }

        return Restangular.one('sessions').post(undefined, { user: user });
      },
      validate: function() {
        return Restangular.one('sessions/validate').get(undefined);
      },
      logout: function(user) {
        return Restangular.one('sessions', user.id).remove(undefined);
      }
    }
  }
]);
