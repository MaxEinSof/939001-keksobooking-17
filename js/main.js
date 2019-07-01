'use strict';

(function () {
  window.mainPin.setMouseDownCallback(activatePage);
  window.mainPin.setMouseMoveCallback(function () {
    window.form.setAddress(window.mainPin.getCoords());
  });
  window.mainPin.setMouseUpCallback(function () {
    window.form.setAddress(window.mainPin.getCoords());
  });
  window.mainPin.setCheckTail(window.map.isActive);

  window.form.setAddress(window.mainPin.getCoords());

  function activatePage() {
    if (!window.map.isActive()) {
      window.map.activate();
      window.form.activate();
      window.load(onSuccess, onError);
    }
  }

  function onSuccess(data) {
    window.map.addPins(window.filter.apply(data));
    window.filter.activate();
    window.filter.setSelectСhangeCallback(function () {
      window.map.addPins(window.filter.apply(data));
    });
  }

  function onError() {
    window.map.deactivate();
    window.form.deactivate();
    window.message.showError();
  }
})();
