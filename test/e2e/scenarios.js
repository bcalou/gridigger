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

  it('should focus on next input when typing into an input', function() {

    var firstInput = element(by.css('#grid tr:nth-child(1) td:nth-child(4) input'));
    var secondInput = element(by.css('#grid tr:nth-child(1) td:nth-child(5) input'));
    var thirdInput = element(by.css('#grid tr:nth-child(2) td:nth-child(1) input'));

    // Type into the first input (first line, penultimate column)
    firstInput.sendKeys('A');
    expect(firstInput.getAttribute('value')).toBe('A');

    // Type another letter and verify it was send to the second input (first line, last column)
    browser.actions().sendKeys('B').perform();
    expect(secondInput.getAttribute('value')).toBe('B');

    // Type another letter and verify it was send to the thrid input (second line, first column)
    browser.actions().sendKeys('C').perform();
    expect(thirdInput.getAttribute('value')).toBe('C');

  });

});
