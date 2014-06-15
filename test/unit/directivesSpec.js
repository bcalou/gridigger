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
        expect(element[0].value).toEqual('');
      });
    });

    describe('saveButton', function() {
      it('should generate a save button', function() {
        var element = $compile("<save-grid>")($rootScope);
        $rootScope.$digest();
        expect(element[0].id).toEqual('save-grid');
      });
    });

    describe('loadButton', function() {
      it('should generate a load button', function() {
        var element = $compile("<load-grid>")($rootScope);
        $rootScope.$digest();
        expect(element[0].id).toEqual('load-grid');
      });
    });

});