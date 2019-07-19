'use strict';

(function () {
  var Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };

  function load(onSuccess, onError) {
    var xhr = createRequest(onSuccess, onError);
    xhr.open('GET', Url.LOAD);
    xhr.send();
  }

  function upload(formData, onSuccess, onError) {
    var xhr = createRequest(onSuccess, onError);
    xhr.open('POST', Url.UPLOAD);
    xhr.send(formData);
  }

  function createRequest(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

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

    return xhr;
  }

  window.server = {
    load: load,
    upload: upload
  };
})();
