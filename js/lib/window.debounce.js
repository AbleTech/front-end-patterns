// As seen at https://davidwalsh.name/javascript-debounce-function,
// a port of http://underscorejs.org/#debounce
// To debounce a function, wrap the affected function in a `debounce()`
// Great for window.resize event handlers.
window.debounce = function(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
};
