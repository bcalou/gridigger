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
          if($(this).parent().next().find('input').length) {
            $(this).parent().next().find('input').focus();
          } else {
            $(this).parent().parent().next().find('input').eq(0).focus();
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
        if(localStorage.gridData && localStorage.gridData.length > 0) {
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
          $('#grid input').val('');
        });
      }
    }
  })

  .directive('stringSearch', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: false,
      template: '<input class="string-search search" maxlength="15"/>',
      link: function(scope, element) {

        var maxRank = 0;

        // Get 8 inputs around given input
        scope.getAdjacentInputs = function(input) {
          var value = input.val().toUpperCase();
          var column = parseInt(input.parent().index());
          var line = parseInt(input.parent().parent().index());
          return new Array(
            scope.getInput(column, line - 1),
            scope.getInput(column + 1, line - 1),
            scope.getInput(column + 1, line),
            scope.getInput(column + 1, line + 1),
            scope.getInput(column, line + 1),
            scope.getInput(column - 1, line + 1),
            scope.getInput(column - 1, line),
            scope.getInput(column - 1, line - 1)
          );
        }

        scope.getInput = function(column, line) {
          return $('#grid tr:nth-child(' + parseInt(line + 1) + ') td:nth-child(' + parseInt(column + 1) + ') input');
        }

        scope.$watch("redundancy", function() {
          $(element).trigger('input');
        });

        // When searching something
        $(element).on('input', function() {
          var input = $(element).val().toUpperCase();
          var inputLength = input.length;
          var resultsGroups = new Array();
          for(i = maxRank; i >= 0; i--) {
            $('#grid input.rank-' + i).removeClass('string-result rank-' + i);
          }
          maxRank = 0;
          if(inputLength > 0) { // First letter
            var group = 0;
            $('#grid input').each(function() {
              if($(this).val().toUpperCase() == input[0]) {
                $(this).addClass('rank-0');
              }
            });
          }
          if(inputLength > 1) { // Other letters
            for (var i = 1; i < inputLength; i++) {
              $('#grid input.rank-' + parseInt(i-1)).each(function () {
                var foundSomething = false;
                var adjacentInputs = scope.getAdjacentInputs($(this));
                for (var j = 0; j < adjacentInputs.length; j++) {
                  if($(adjacentInputs[j]).val()
                    && $(adjacentInputs[j]).val().toUpperCase() == input[i]) {
                    $(adjacentInputs[j]).addClass('rank-' + i);
                    foundSomething = true;
                    maxRank = i;
                  }
                }
                if(!foundSomething) {
                  $(this).removeClass('rank-' + parseInt(i-1));
                }
              });
            }
          }
          // At the end, set result class to correct chains
          $('#grid input.rank-' + maxRank).each(function() {
            $(this).addClass('string-result');
          });
          for(var i = maxRank; i >= 0; i--) {
            $('#grid input.string-result.rank-' + i).each(function() {
              var adjacentInputs = scope.getAdjacentInputs($(this));
              for(var j = 0; j < adjacentInputs.length; j++) {
                if(adjacentInputs[j].hasClass('rank-' + parseInt(i-1))) {
                  adjacentInputs[j].addClass('string-result');
                }
              }
            });
          }
        });
      }
    }
  })

  .directive('inlineSearch', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      template: '<input class="inline-search search" maxlength="15"/>',
      link: function(scope, element, attr) {
        var inlineGroup = attr['inlineGroup'];

        scope.highlightResults = function(input, selection) {
          if(scope.selectionContainsValues(input, selection)) {
            for(var i = 0; i < selection.length; i++) {
              $(selection[i]).addClass('inline-group-' + inlineGroup);
            }
          }
        }

        scope.selectionContainsValues = function(search, selection) {
          var valid = true;
          for(var i = 0; i < search.length; i++) {
            if(!scope.valueIsInSelection(search[i], selection)) {
              valid = false;
            }
          }

          $('#grid input.used').removeClass('used');
          return valid;
        }

        scope.valueIsInSelection = function(value, selection) {
          for(var i = 0; i < selection.length; i++) {
            if($(selection[i]).val().toUpperCase() == value
               && (!$(selection[i]).hasClass('used') || scope.redundancy)
              ) {
              $(selection[i]).addClass('used');
              return true;
            }
          }
          return false;
        }

        scope.getCell = function(line, column) {
          return $('#grid tr:nth-child(' + line + ') td:nth-child(' + column + ') input');
        }

        scope.$watch("redundancy", function() {
          $(element).trigger('input');
        });

        // When searching something
        $(element).on('input', function() {
          $('#grid input.inline-group-' + inlineGroup).removeClass('inline-group-' + inlineGroup);
          var input = $(element).val().toUpperCase();
          if(input.length > 0) {
            // Search lines
            for(var line = 0; line < scope.linesNb; line++) {
              var lineInputs = $('#grid tr:eq(' + line + ') input');
              scope.highlightResults(input, lineInputs);
            }
            // Search columns
            for(var column = 0; column < scope.columnsNb; column++) {
              var columnInputs = $('#grid td:nth-child(' + parseInt(column + 1) + ') input');
              scope.highlightResults(input, columnInputs);
            }
            // Search diagonals from top left to bottom right
            // North east part
            for(var column = 1; column <= scope.columnsNb; column++) {
              var diagonalInputs = [];
              for(var line = 1; line <= parseInt(scope.linesNb - column + 1); line++) {
                diagonalInputs.push(scope.getCell(line, parseInt(line + column - 1)));
              }
              scope.highlightResults(input, diagonalInputs);
            }
            // South west part
            for(var line = 2; line <= scope.linesNb; line++) {
              var diagonalInputs = [];
              for(var column = 1; column <= parseInt(scope.columnsNb - line + 1); column++) {
                diagonalInputs.push(scope.getCell(parseInt(column + line - 1), column));
              }
              scope.highlightResults(input, diagonalInputs);
            }
            // Search diagonals from bottom left to top right
            // North west part
            for(var line = 1; line <= scope.linesNb; line++) {
              var diagonalInputs = [];
              for(var column = line; column >= 1; column--) {
                diagonalInputs.push(scope.getCell(column, parseInt(line + 1 - column)));
              }
              scope.highlightResults(input, diagonalInputs);
            }
            // Second part
            // South East part
            for(var column = 2; column <= scope.columnsNb; column++) {
              var diagonalInputs = [];
              for(var line = column; line <= scope.linesNb; line++) {
                diagonalInputs.push(scope.getCell(line, parseInt(column + parseInt(scope.columnsNb - line))));
              }
              scope.highlightResults(input, diagonalInputs);
            }
          }
        });
      }
    }
  })
;