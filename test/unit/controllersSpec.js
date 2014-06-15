'use strict';

/* jasmine specs for controllers go here */

describe('GridCtrl', function(){

  beforeEach(module('gridigger'));

  it('should have a default value for linesNb and ColumnsNb', inject(function($controller) {

    var scope = {},
        ctrl = $controller('GridCtrl', {$scope:scope});

    // Verify default value of linesNb and ColumnsNb
    expect(scope.linesNb).toBe(10);
    expect(scope.columnsNb).toBe(10);

  }));

  it('should return a list of three items when getList is called with 3', inject(function($controller) {

    var scope = {},
        ctrl = $controller('GridCtrl', {$scope:scope});

    // Get list and verifies size of result
    var list = scope.getList(3);
    expect(list.length).toBe(3);

  }));

});