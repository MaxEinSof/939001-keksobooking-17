'use strict';

(function () {
  var ESC_KEYCODE = 27;

  function isEscPressed(evt) {
    return evt.keyCode === ESC_KEYCODE;
  }

  function disableInputs(formInputs) {
    for (var i = 0; i < formInputs.length; i++) {
      formInputs[i].disabled = true;
    }
  }

  function enableInputs(formInputs) {
    for (var i = 0; i < formInputs.length; i++) {
      formInputs[i].disabled = false;
    }
  }

  function setIds(array) {
    array.forEach(function (object, i) {
      object.id = i;
    });
  }

  window.utility = {
    isEscPressed: isEscPressed,
    disableInputs: disableInputs,
    enableInputs: enableInputs,
    setIds: setIds
  };
})();
