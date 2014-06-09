'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('gridigger', function() {

  browser.get('index.html');

  it('should not show any cell at the beginning', function() {

    // Getting cells and verfying it equals 0
    var cells = element.all(by.css('#grid input'));
    expect(cells.count()).toBe(0);

  });

  it('should generate a grid when setting linesNb and columnsNb', function() {

    // Getting and setting linesNb and columnsNb
    var linesNb = element(by.model('linesNb'));
    var columnsNb = element(by.model('columnsNb'));
    linesNb.sendKeys('4');
    columnsNb.sendKeys('5');

    // There now should be linesNb*columnsNb cells
    var cells = element.all(by.css('#grid input'));
    expect(cells.count()).toBe(20);

  });

});
