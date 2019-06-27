'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  function load(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.open('GET', URL);
    xhr.send();

    xhr.addEventListener('load', onXhrLoad);
    xhr.addEventListener('error', onXhrError);
    xhr.addEventListener('timeout', onXhrTimeout);

    function onXhrLoad() {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    }

    function onXhrError() {
      onError();
    }

    function onXhrTimeout() {
      onError();
    }
  }

  window.load = load;
})();
