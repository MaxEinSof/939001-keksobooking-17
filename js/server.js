'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';

  function load(onSuccess, onError) {
    var xhr = createRequest('load', onSuccess, onError);
    xhr.open('GET', URL_LOAD);
    xhr.send();
  }

  function upload(formData, onSuccess, onError) {
    var xhr = createRequest('upload', onSuccess, onError);
    xhr.open('POST', URL_UPLOAD);
    xhr.send(formData);
  }

  function createRequest(type, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', onXhrLoad);
    xhr.addEventListener('error', onXhrError);
    xhr.addEventListener('timeout', onXhrTimeout);

    function onXhrLoad() {
      if (xhr.status === 200) {
        switch (type) {
          case 'load':
            onSuccess(xhr.response);
            break;
          case 'upload':
            onSuccess();
            break;
        }
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
