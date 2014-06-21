'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('gridigger', function() {

  var mainPage = require('./pages/main_page.js');

  browser.get('index.html');

  it('should show a specific number of cells at the beginning', function() {

    // Setup
    mainPage.resetGrid();

    // Verify there are 100 cells
    expect(mainPage.cells.count()).toBe(100);

  });

  it('should change the number of cells when changing linesNb and columnsNb', function() {

    // Setup
    mainPage.resetGrid();

    // Set linesNb and columnsNb
    mainPage.setLinesNumber('4');
    mainPage.setColumnsNumber('5');

    // There now should be 20 cells
    expect(mainPage.cells.count()).toBe(20);

    // Reset state
    mainPage.resetGrid();

  });

  it('should focus on next input when typing into an input', function() {

    // Setup
    mainPage.resetGrid();

    // Type into the first input (first line, penultimate column)
    mainPage.getCell(1, 9).sendKeys('A');
    expect(mainPage.getCellValue(1, 9)).toBe('A');

    // Type another letter and verify it was send to the second input (first line, last column)
    browser.actions().sendKeys('B').perform();
    expect(mainPage.getCellValue(1, 10)).toBe('B');

    // Type another letter and verify it was send to the thrid input (second line, first column)
    browser.actions().sendKeys('C').perform();
    expect(mainPage.getCellValue(2, 1)).toBe('C');

    // Reset state
    mainPage.resetGrid();

  });

  it('should save the grid dimensions and data and load them on next visit', function() {

    // Setup
    mainPage.resetGrid();

    // Set linesNb and columnsNb
    mainPage.setLinesNumber('4');
    mainPage.setColumnsNumber('5');

    // Set some data in first cells
    mainPage.getCell(1, 1).sendKeys('A');
    mainPage.getCell(2, 3).sendKeys('B');
    mainPage.getCell(4, 2).sendKeys('C');

    // Save the grid
    mainPage.saveGridButton.click();

    // Change the dimensions and data
    mainPage.setLinesNumber('2');
    mainPage.setColumnsNumber('2');
    mainPage.getCell(1, 1).sendKeys('D');

    // Load the saved grid
    mainPage.loadGridButton.click();

    // The dimensions and data should be loaded
    expect(mainPage.linesNbInput.getAttribute('value')).toBe('4');
    expect(mainPage.columnsNbInput.getAttribute('value')).toBe('5');
    expect(mainPage.getCellValue(1, 1)).toBe('A');
    expect(mainPage.getCellValue(2, 3)).toBe('B');
    expect(mainPage.getCellValue(4, 2)).toBe('C');

    // Reset state
    mainPage.resetGrid();

  });

  it('should automatically load the local storage data when arriving on the page', function() {

    // Setup
    mainPage.resetGrid();

    // Set linesNb and columnsNb
    mainPage.setLinesNumber('5');
    mainPage.setColumnsNumber('4');

    // Set some data in first cells
    mainPage.getCell(2, 1).sendKeys('A');
    mainPage.getCell(1, 3).sendKeys('B');
    mainPage.getCell(2, 3).sendKeys('C');

    // Save the grid
    mainPage.saveGridButton.click();

    // Reload page
    browser.get('index.html');

    // The dimensions and data should be loaded
    expect(mainPage.linesNbInput.getAttribute('value')).toBe('5');
    expect(mainPage.columnsNbInput.getAttribute('value')).toBe('4');
    expect(mainPage.getCellValue(2, 1)).toBe('A');
    expect(mainPage.getCellValue(1, 3)).toBe('B');
    expect(mainPage.getCellValue(2, 3)).toBe('C');

    // Reset state
    mainPage.resetGrid();

  })

  it('should empty the grid when clicking on empty grid button', function() {

    // Setup
    mainPage.resetGrid();

    // Setting some data
    mainPage.getCell(1, 1).sendKeys('A');
    mainPage.getCell(2, 2).sendKeys('B');

    // Empty grid
    mainPage.emptyGridButton.click();

    // Verify the grid is empty
    expect(mainPage.getCellValue(1, 1)).toBe('');
    expect(mainPage.getCellValue(2, 2)).toBe('');

  });

});
