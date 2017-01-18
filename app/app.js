/**
* Angular Plugins
**/
require('angular');
require('restangular');
require('angular-ui-router');
require('ng-toast');
require('angular-sanitize');
require('angular-cookies');

/**
* Angular Configurations
**/
require('TodoConfig');
require('TodoConfigRoutes');

/**
* Angular List Module
* Module required in each file controller
* -------------------
* Todo
**/

/**
* Angular Controllers
**/
require('AppController');
require('TodoController');

/**
* Angular Services
**/
require('TaskService');
require('AuthService');
