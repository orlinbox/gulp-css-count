var parse = require('css-parse');
var map = require('map-stream');
var color = require('colors');

module.exports = function() {
  'use strict';

  return map(function(file, callback) {

    // functions

    function traverse(o) {
      for (var i in o) {
        if (typeof o[i] === 'object') {
          if (o[i].type === 'rule') {
            countRules++;
            countSelectors += o[i].selectors.length;
            for (var j = 0; j < o[i].selectors.length; j++) {
              selectorSplit(o[i].selectors[j] + ' ');
            }
            countDeclarations += o[i].declarations.length;
            continue;
          }
          traverse(o[i]);
        }
      }
    }

    function selectorSplit(selector) {
      var selectorString = selector.replace('>', ' ').replace('+', ' ').replace('~', ' ').replace(/\s\s+/g, ' ');
      var selectorsDepth = selectorString.split(' ').length - 1;
      if (typeof nestingArr[selectorsDepth] === 'undefined') {
        nestingArr[selectorsDepth] = 1;
      } else {
        nestingArr[selectorsDepth]++;
      }
      countAsterisk += (selectorString.split('*').length - 1);
    }

    function createNestingTextAndDepth(nestingArr, countAsterisk, countSelectors) {
      var nestingText = '';
      nestingArr.forEach(function(val, ind) {
        var nestingContent = 'D' + ind + ': ' + val + ' (' + Math.round((val/countSelectors)*100) + '%)';
        if (ind > 5) {
          nestingText += color.yellow(nestingContent);
        } else {
          nestingText += nestingContent;
        }
        nestingText += ' | ';
      });
      var asteriskContent = '* ' + countAsterisk;
      if (countAsterisk > 9) {
        nestingText += color.yellow(asteriskContent);
      } else {
        nestingText += asteriskContent;
      }
      return nestingText;
    }

    // iniital vars

    var nestingArr = [];
    var countAsterisk = 0;
    var countRules = 0;
    var countSelectors = 0;
    var countDeclarations = 0;
    var fileContents;
    var parsedData;

    // action

    if (file.isBuffer()) fileContents = new Buffer(file.contents).toString();
    parsedData = parse(fileContents).stylesheet;
    traverse(parsedData);

    // vars after action

    var selectorsPerRule = (countSelectors/countRules).toFixed(1);
    var declarationsPerRule = (countDeclarations/countRules).toFixed(1);
    var fileSize = (fileContents.length/1000).toFixed(2);

    // lines

    var line1 = 'Selectors: ' + countSelectors;
    line1 += ' | Declr: ' + countDeclarations;
    line1 += ' | Rules: ' + countRules;
    line1 += ' | S/R: ' + selectorsPerRule;
    line1 += ' | D/R: ' + declarationsPerRule;

    var line2 = createNestingTextAndDepth(nestingArr, countAsterisk, countSelectors);

    // output

    console.log('\n' + color.cyan(file.path) + ' ' +  color.yellow(fileSize +' kB') + '\n' + color.dim(line1) + '\n' + line2);

    callback(null, file);
  });

};
