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

    describe('saveGridButton', function() {
      it('should generate a save grid button', function() {
        var element = $compile("<save-grid>")($rootScope);
        $rootScope.$digest();
        expect(element[0].id).toEqual('save-grid');
      });
    });

    describe('loadGridButton', function() {
      it('should generate a load grid button', function() {
        var element = $compile("<load-grid>")($rootScope);
        $rootScope.$digest();
        expect(element[0].id).toEqual('load-grid');
      });
    });

    describe('emptyGridButton', function() {
      it('should generate a empty grid button', function() {
        var element = $compile("<empty-grid>")($rootScope);
        $rootScope.$digest();
        expect(element[0].id).toEqual('empty-grid');
      });
    });

    describe('gridSearchField', function() {
      it('should generate a grid search field', function() {
        var element = $compile("<grid-search>")($rootScope);
        $rootScope.$digest();
        expect(element[0].value).toEqual('');
      });
    });

});