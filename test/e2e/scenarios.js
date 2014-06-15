'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('gridigger', function() {

  browser.get('index.html');

  it('should show a specific number of cells at the beginning', function() {

    var cells = element.all(by.css('#grid input'));

    // Verifying there are 100 cells
    expect(cells.count()).toBe(100);

  });

  it('should change the number of cells when changing linesNb and columnsNb', function() {

    var linesNb = element(by.model('linesNb'));
    var columnsNb = element(by.model('columnsNb'));

    // Setting linesNb and columnsNb
    linesNb.clear();
    linesNb.sendKeys('4');
    columnsNb.clear();
    columnsNb.sendKeys('5');

    // There now should be linesNb*columnsNb cells
    var cells = element.all(by.css('#grid input'));
    expect(cells.count()).toBe(20);

    // Reset state
    linesNb.clear()
    linesNb.sendKeys('10');
    columnsNb.clear()
    columnsNb.sendKeys('10');

  });

  it('should focus on next input when typing into an input', function() {

    var firstInput = element(by.css('#grid tr:nth-child(1) td:nth-child(9) input'));
    var secondInput = element(by.css('#grid tr:nth-child(1) td:nth-child(10) input'));
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

    // Reset state
    firstInput.clear();
    secondInput.clear();
    thirdInput.clear();

  });

  it('should save the grid dimensions and data and load them on next visit', function() {

    var linesNb = element(by.model('linesNb'));
    var columnsNb = element(by.model('columnsNb'));

    // Setting linesNb and columnsNb
    linesNb.clear();
    linesNb.sendKeys('4');
    columnsNb.clear();
    columnsNb.sendKeys('5');

    // Setting some data in first cells
    var firstInput = element(by.css('#grid tr:nth-child(1) td:nth-child(1) input'));
    var secondInput = element(by.css('#grid tr:nth-child(2) td:nth-child(3) input'));
    var thirdInput = element(by.css('#grid tr:nth-child(4) td:nth-child(2) input'));
    firstInput.sendKeys('A');
    secondInput.sendKeys('B');
    thirdInput.sendKeys('C');

    // Saving the grid
    var saveButton = element(by.css("#save-grid"));
    saveButton.click();

    // Changing the dimensions and data
    linesNb.clear();
    linesNb.sendKeys('2');
    columnsNb.clear();
    columnsNb.sendKeys('2');
    firstInput.clear();
    firstInput.sendKeys('D');

    // Loading the saved grid
    var loadButton = element(by.css("#load-grid"));
    loadButton.click();

    // The dimensions and data should be loaded
    expect(linesNb.getAttribute('value')).toBe('4');
    expect(columnsNb.getAttribute('value')).toBe('5');
    expect(firstInput.getAttribute('value')).toBe('A');
    expect(secondInput.getAttribute('value')).toBe('B');
    expect(thirdInput.getAttribute('value')).toBe('C');

    // Reset
    firstInput.clear();
    secondInput.clear();
    thirdInput.clear();
    linesNb.clear()
    linesNb.sendKeys('10');
    columnsNb.clear()
    columnsNb.sendKeys('10');

  });

});
