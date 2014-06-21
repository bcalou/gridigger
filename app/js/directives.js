'use strict';

/* Directives */

angular.module('gridigger.directives', [])

  .directive('gridInput', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: false,
      template: '<input type="text" maxlength="1">',
      link: function(scope, element) {

        // Focus on next input on keypress
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

  .directive('saveGrid', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      template: '<button ng-transclude id="save-grid"></button>',
      link: function(scope, element) {

        // Save grid in local storage on click
        $(element).click(function() {
          localStorage.linesNb = scope.linesNb;
          localStorage.columnNb = scope.columnsNb;
          var data = '';
          $('#grid input').each(function() {
            if($(this).val().length) {
              data += $(this).val();
            } else {
              data += ' ';
            }
          });
          localStorage.gridData = data;
        });
      }
    }
  })

  .directive('loadGrid', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      template: '<button ng-transclude id="load-grid"></button>',
      link: function(scope, element) {

        // Load data to grid from local storage
        scope.loadData = function() {
          scope.linesNb = localStorage.linesNb;
          scope.columnsNb = localStorage.columnNb;
          scope.$apply();
          var data = localStorage.gridData;
          var inputs = $('#grid input');
          inputs.each(function(index) {
            if(data.charAt(index) != ' ') {
              $(this).val(data.charAt(index));
            }
          });
        }

        // Load on click
        $(element).click(function() {
          scope.loadData();
        });

        // Load at start
        if(localStorage.gridData.length > 0) {
          setTimeout(function() {
            scope.loadData();
          }, 100);
        }
      }
    }
  })

  .directive('emptyGrid', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      template: '<button ng-transclude id="empty-grid"></button>',
      link: function(scope, element) {

        // Empty all inputs on click
        $(element).click(function() {
          $('#grid input').val("");
        });
      }
    }
  })

;