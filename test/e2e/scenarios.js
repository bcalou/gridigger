'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('gridigger', function() {

  var mainPage = require('./pages/main_page.js');

  browser.get('index.html');

  it('should show a specific number of cells at the beginning', function() {

    // Verifying there are 100 cells
    expect(mainPage.cells.count()).toBe(100);

  });

  it('should change the number of cells when changing linesNb and columnsNb', function() {

    // Setting linesNb and columnsNb
    mainPage.setLinesNumber('4');
    mainPage.setColumnsNumber('5');

    // There now should be 20 cells
    expect(mainPage.cells.count()).toBe(20);

    // Reset state
    mainPage.resetDimensions();

  });

  it('should focus on next input when typing into an input', function() {

    // Type into the first input (first line, penultimate column)
    mainPage.getCell(1, 9).sendKeys('A');
    expect(mainPage.getCell(1, 9).getAttribute('value')).toBe('A');

    // Type another letter and verify it was send to the second input (first line, last column)
    browser.actions().sendKeys('B').perform();
    expect(mainPage.getCell(1, 10).getAttribute('value')).toBe('B');

    // Type another letter and verify it was send to the thrid input (second line, first column)
    browser.actions().sendKeys('C').perform();
    expect(mainPage.getCell(2, 1).getAttribute('value')).toBe('C');

    // Reset state
    mainPage.getCell(1, 9).clear();
    mainPage.getCell(1, 10).clear();
    mainPage.getCell(2, 1).clear();

  });

  it('should save the grid dimensions and data and load them on next visit', function() {

    // Setting linesNb and columnsNb
    mainPage.setLinesNumber('4');
    mainPage.setColumnsNumber('5');

    // Setting some data in first cells
    mainPage.getCell(1, 1).sendKeys('A');
    mainPage.getCell(2, 3).sendKeys('B');
    mainPage.getCell(4, 2).sendKeys('C');

    // Saving the grid
    mainPage.saveGridButton.click();

    // Changing the dimensions and data
    mainPage.setLinesNumber('2');
    mainPage.setColumnsNumber('2');
    mainPage.getCell(1, 1).sendKeys('D');

    // Loading the saved grid
    mainPage.loadGridButton.click();

    // The dimensions and data should be loaded
    expect(mainPage.linesNbInput.getAttribute('value')).toBe('4');
    expect(mainPage.columnsNbInput.getAttribute('value')).toBe('5');
    expect(mainPage.getCell(1, 1).getAttribute('value')).toBe('A');
    expect(mainPage.getCell(2, 3).getAttribute('value')).toBe('B');
    expect(mainPage.getCell(4, 2).getAttribute('value')).toBe('C');

    // Reset state
    mainPage.getCell(1, 1).clear();
    mainPage.getCell(2, 3).clear();
    mainPage.getCell(4, 2).clear();
    mainPage.resetDimensions();

  });

});
