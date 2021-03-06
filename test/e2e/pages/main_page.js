var mainPage = function() {

  this.defaultLinesNb = 10;
  this.defaultColumnsNb = 10;

  this.cells = element.all(by.css('#grid input'));

  this.linesNbInput = element(by.model('linesNb'));
  this.columnsNbInput = element(by.model('columnsNb'));

  this.line1Column1Cell = element(by.css('#grid tr:nth-child(1) td:nth-child(1) input'));
  this.line1Column9Cell = element(by.css('#grid tr:nth-child(1) td:nth-child(9) input'));
  this.line1Column10Cell = element(by.css('#grid tr:nth-child(1) td:nth-child(10) input'));
  this.line2Column1Cell = element(by.css('#grid tr:nth-child(2) td:nth-child(1) input'));
  this.line2Column3Cell = element(by.css('#grid tr:nth-child(2) td:nth-child(3) input'));
  this.line4Column2Cell = element(by.css('#grid tr:nth-child(4) td:nth-child(2) input'));

  this.saveGridButton = element(by.css("#save-grid"));
  this.loadGridButton = element(by.css("#load-grid"));
  this.emptyGridButton = element(by.css("#empty-grid"));

  this.redundancyCheckbox = element(by.css('.redundancy'));
  this.stringSearchInputs = element.all(by.css('.string-search'));
  this.addStringSearchButton = element(by.css('#add-string-search'));
  this.inlineSearchInputs = element.all(by.css('.inline-search'));
  this.addInlineSearchButton = element(by.css('#add-inline-search'));

  this.getCell = function(line, column) {
    return element(by.css('#grid tr:nth-child(' + line + ') td:nth-child(' + column + ') input'));
  }

  this.getCellValue = function(line, column) {
    return this.getCell(line, column).getAttribute('value');
  }

  this.setLinesNumber = function(linesNb) {
    this.linesNbInput.clear();
    this.linesNbInput.sendKeys(linesNb);
  }

  this.setColumnsNumber = function(linesNb) {
    this.columnsNbInput.clear();
    this.columnsNbInput.sendKeys(linesNb);
  }

  this.resetDimensions = function() {
    this.setLinesNumber(this.defaultLinesNb);
    this.setColumnsNumber(this.defaultColumnsNb);
  }

  this.resetGrid = function() {
    this.resetDimensions();
    this.emptyGridButton.click();
  }

  this.loadAlphabetGrid = function() {
    this.setLinesNumber(5);
    this.setColumnsNumber(5);
    var alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
    for(line = 1; line <= 5; line++) {
      for(column = 1; column <= 5; column++) {
        this.getCell(line, column).sendKeys(alphabet.charAt((line-1)*5+column-1));
      }
    }
  }

};

module.exports = new mainPage();