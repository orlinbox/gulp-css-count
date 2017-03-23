var map = require('map-stream');
var gutil = require('gulp-util');

module.exports = function(){
  'use strict';

  return map(function(file, callback){
    gutil.log(gutil.colors.cyan("Coming soon..."));

    callback(null, file);
  });

};
