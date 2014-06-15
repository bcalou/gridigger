'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {
    var $compile;
    var $rootScope;

    beforeEach(module('gridigger'));

    beforeEach(inject(function(_$compile_, _$rootScope_){
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    describe('gridInput', function() {
      it('should generate an input', function() {
          var element = $compile("<grid-input>")($rootScope);
          $rootScope.$digest();
          expect(element[0].value).toBeDefined();
      });
    });

});