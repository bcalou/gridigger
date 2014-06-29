'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('gridigger', function() {

  var mainPage = require('./pages/main_page.js');

  browser.get('index.html');

  afterEach(function() {

    // Reset grid
    mainPage.resetGrid();

  });

  it('should show a specific number of cells at the beginning', function() {

    // Verify there are 100 cells
    expect(mainPage.cells.count()).toBe(100);

  });

  it('should change the number of cells when changing linesNb and columnsNb', function() {

    // Set linesNb and columnsNb
    mainPage.setLinesNumber('4');
    mainPage.setColumnsNumber('5');

    // There now should be 20 cells
    expect(mainPage.cells.count()).toBe(20);

  });

  it('should focus on next input when typing into an input', function() {

    // Type into the first input (first line, penultimate column)
    mainPage.getCell(1, 9).sendKeys('A');
    expect(mainPage.getCellValue(1, 9)).toBe('A');

    // Type another letter and verify it was send to the second input (first line, last column)
    browser.actions().sendKeys('B').perform();
    expect(mainPage.getCellValue(1, 10)).toBe('B');

    // Type another letter and verify it was send to the thrid input (second line, first column)
    browser.actions().sendKeys('C').perform();
    expect(mainPage.getCellValue(2, 1)).toBe('C');

  });

  it('should save the grid dimensions and data and load them on next visit', function() {

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

  });

  it('should automatically load the local storage data when arriving on the page', function() {

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

  })

  it('should empty the grid when clicking on empty grid button', function() {

    // Setting some data
    mainPage.getCell(1, 1).sendKeys('A');
    mainPage.getCell(2, 2).sendKeys('B');

    // Empty grid
    mainPage.emptyGridButton.click();

    // Verify the grid is empty
    expect(mainPage.getCellValue(1, 1)).toBe('');
    expect(mainPage.getCellValue(2, 2)).toBe('');

  });

  it('should find and highligth a string with redundance', function() {

    // Setup
    mainPage.loadAlphabetGrid();

    // Search string
    mainPage.stringSearchInputs.get(0).sendKeys('AGHNRNO');

    // Verify first string was found
    expect(element(by.css('.string-group-0.rank-0')).getAttribute('value')).toBe('A');
    expect(element(by.css('.string-group-0.rank-1')).getAttribute('value')).toBe('G');
    expect(element(by.css('.string-group-0.rank-2')).getAttribute('value')).toBe('H');
    expect(element(by.css('.string-group-0.rank-3')).getAttribute('value')).toBe('N');
    expect(element(by.css('.string-group-0.rank-4')).getAttribute('value')).toBe('R');
    expect(element(by.css('.string-group-0.rank-5')).getAttribute('value')).toBe('N');
    expect(element(by.css('.string-group-0.rank-6')).getAttribute('value')).toBe('O');

    // Add another search
    mainPage.addStringSearchButton.click();
    mainPage.stringSearchInputs.get(1).sendKeys('ZUOSR');

    // Verify second string was found
    expect(element(by.css('.string-group-1.rank-0')).getAttribute('value')).toBe('Z');
    expect(element(by.css('.string-group-1.rank-1')).getAttribute('value')).toBe('U');
    expect(element(by.css('.string-group-1.rank-2')).getAttribute('value')).toBe('O');
    expect(element(by.css('.string-group-1.rank-3')).getAttribute('value')).toBe('S');
    expect(element(by.css('.string-group-1.rank-4')).getAttribute('value')).toBe('R');

    // First results should still be there
    expect(element.all(by.css('.string-group-0')).count()).toBe(6); // 6 and not 7 because one letter is used twice

    // Reset state
    mainPage.stringSearchInputs.get(0).clear();
    mainPage.stringSearchInputs.get(1).clear();

  })

  it('should find and highligth a line, column or diagonal containing specific values with redundancy or not', function() {

    // Setup
    mainPage.loadAlphabetGrid();

    // Authorize redundancy and search lines, columns and diagonals
    mainPage.redundancyCheckbox.click();
    mainPage.inlineSearchInputs.get(0).sendKeys('A');

    // This search should return 13 results
    expect(element.all(by.css('.inline-group-0')).count()).toBe(13);

    // More complex search
    mainPage.inlineSearchInputs.get(0).sendKeys('AGNA');

    // This search should return 5 results
    expect(element.all(by.css('.inline-group-0')).count()).toBe(5);

    // Remove redundancy authorization
    mainPage.redundancyCheckbox.click();

    // There should now be no result
    expect(element.all(by.css('.inline-group-0')).count()).toBe(0);

    // Redo more simple search
    mainPage.inlineSearchInputs.get(0).clear();
    mainPage.inlineSearchInputs.get(0).sendKeys('A');

    // The result should be the same than on the first search
    expect(element.all(by.css('.inline-group-0')).count()).toBe(13);

    // Add an inline search field
    mainPage.addInlineSearchButton.click();
    mainPage.inlineSearchInputs.get(1).sendKeys('CH')

    // Both results should now co-exist
    expect(element.all(by.css('.inline-group-0')).count()).toBe(13);
    expect(element.all(by.css('.inline-group-1')).count()).toBe(5);

    // Reset state
    mainPage.inlineSearchInputs.get(0).clear();
    mainPage.inlineSearchInputs.get(1).clear();

  })

});
