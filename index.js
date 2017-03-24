var fs = require("fs");
var map = require('map-stream');
var gutil = require('gulp-util');
var gzip_size = require('gzip-size');

module.exports = function(){
  'use strict';

  return map(function(file, callback){

    // line1
    var totalSelectors = '?';
    var totalDeclarations = '?';
    var totalRules = '?';
    var selectorsPerRule = '?';
    var declarationsPerRule = '?';
    var stats = fs.statSync(file.path);
    var fileSize = stats.size;
    var gzipSize = gzip_size.sync(file.contents);

    var line1 = 'Selectors: ' + totalSelectors;
    line1 += ' | Declr: ' + totalDeclarations;
    line1 += ' | Rules: ' + totalRules;
    line1 += ' | S/R: ' + selectorsPerRule;
    line1 += ' | D/R: ' + declarationsPerRule;
    line1 += ' || '+ gutil.colors.green(Math.ceil((fileSize/1000).toFixed()) +'k ('+ Math.ceil((gzipSize/1000).toFixed()) +'k gzip)');

    // line2
    var line2 = '---';

    // output
    gutil.log('\n\n' + gutil.colors.cyan(file.path) + '\n' + line1 + '\n' + line2 + '\n');

    callback(null, file);
  });

};
