'use strict';

/* Directives */

angular.module('gridigger.directives', [])

  .directive('gridInput', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: false,
      template: '<input type="text" maxlength="1">',
      link: function(scope, element, attrs) {
        $(element).keypress(function() {
          if($(element).parent().next().find('input').length) {
            $(element).parent().next().find('input').focus();
          } else {
            $(element).parent().parent().next().find('input').eq(0).focus();
          }
        });
      }
    }
  })

;