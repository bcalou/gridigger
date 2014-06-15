'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('gridigger', function() {

  browser.get('index.html');

  it('should show a specific number of cells at the beginning', function() {

    // Getting cells and verfying it equals 100
    var cells = element.all(by.css('#grid input'));
    expect(cells.count()).toBe(100);

  });

  it('should change the number of cells when changing linesNb and columnsNb', function() {

    // Getting and setting linesNb and columnsNb
    var linesNb = element(by.model('linesNb'));
    var columnsNb = element(by.model('columnsNb'));
    linesNb.clear();
    linesNb.sendKeys('4');
    columnsNb.clear();
    columnsNb.sendKeys('5');

    // There now should be linesNb*columnsNb cells
    var cells = element.all(by.css('#grid input'));
    expect(cells.count()).toBe(20);

  });

});
