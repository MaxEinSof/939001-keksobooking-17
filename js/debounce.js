'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout = null;

  function debounce(callback) {
    return function() {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callback();
      }, DEBOUNCE_INTERVAL);
    };
  }

  window.debounce = debounce;
})();
