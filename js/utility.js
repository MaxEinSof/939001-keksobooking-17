'use strict';

(function () {
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
    disableInputs: disableInputs,
    enableInputs: enableInputs,
    setIds: setIds
  };
})();
