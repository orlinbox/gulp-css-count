Count CSS selectors, nesting depth, declarations and rules in CSS files.

* To monitor simplicity of CSS files (depth/nesting of selectors and etc.)

## Getting Started

This plugin requires Gulp. You may install the plugin with this command:

```shell
npm install gulp-css-count --save-dev
```

## Sample Output

```
test/style.css 32.05 kB
Selectors: 17 | Declr: 16 | Rules: 11 | S/R: 1.5 | D/R: 1.5
D1: 7 (41%) | D2: 3 (18%) | D3: 4 (24%) | D4: 2 (12%) | * 4
```

**Line 1:** Location and size of the CSS file being counted.

**Line 2:** General statistics of the file.

S/R: selectors to rules ratio, 
D/R: declarations to rules ratio

**Line 3:** Depth of selectors (nesting count) and number of used global CSS selectors (*).

Nesting depth explanation:

D1:
```.selector-1 { ... }```

D2:
```.selector-1 .selector-2 { ... }```

D3:
```.selector-1 .selector-2 .selector-3 { ... }```

...

## Example

Gulp 3 config (gulpfile.js) containing the css-count task. Gulp 4 one is similar.

```js
var gulp = require('gulp');
var gulp_css_count = require('gulp-css-count');

gulp.task('csscount', function() {
  return gulp.src('./css/**/*.css')
    .pipe(gulp_css_count());
});
```

***

## Credits

* [@visionmedia](https://github.com/visionmedia) for the great [css-parse](https://github.com/visionmedia/css-parse) library.
