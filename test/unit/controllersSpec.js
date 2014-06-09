'use strict';

/* jasmine specs for controllers go here */

describe('GridCtrl', function(){

  beforeEach(module('gridigger'));

  it('should return a list of three items when getList is called with 3', inject(function($controller) {

    // Setting controller
    var scope = {},
        ctrl = $controller('GridCtrl', {$scope:scope});

    // Get list and verifies size of result
    var list = scope.getList(3);
    expect(list.length).toBe(3);

  }));

});