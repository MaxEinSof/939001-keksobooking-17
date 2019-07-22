'use strict';

(function () {
  var ESC_KEYCODE = 27;

  function isEscPressed(evt) {
    return evt.keyCode === ESC_KEYCODE;
  }

  function disableInputs(formInputs) {
    formInputs.forEach(function (input) {
      input.disabled = true;
    });
  }

  function enableInputs(formInputs) {
    formInputs.forEach(function (input) {
      input.disabled = false;
    });
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
