'use strict';


// Declare app level module which depends on filters, and services
angular.module('gridigger', [
  'ngRoute',
  'gridigger.filters',
  'gridigger.services',
  'gridigger.directives',
  'gridigger.controllers',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/main.html', controller: 'GridCtrl'});
}]);
