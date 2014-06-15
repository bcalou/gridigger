'use strict';

/* Controllers */

angular.module('gridigger.controllers', [])

  .controller('GridCtrl', ['$scope', function($scope) {

    $scope.linesNb = 10;
    $scope.columnsNb = 10;

    $scope.getList = function(length) {
      var result = [];
        for (var i = 1; i <= length; i++) {
          result.push(i);
        }
        return result;
    }

  }])
;