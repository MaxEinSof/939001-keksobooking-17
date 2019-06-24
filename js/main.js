'use strict';

(function () {
  function activatePage() {
    if (!window.map.isActive()) {
      window.map.activate();
      window.map.addPins(window.data);
      window.form.activate();
    }
  }

  window.mainPin.setMouseDownCallback(activatePage);
  window.mainPin.setMouseMoveCallback(function () {
    window.form.setAddress(window.mainPin.getCoords())
  });
  window.mainPin.setMouseUpCallback(function () {
    window.form.setAddress(window.mainPin.getCoords())
  });
  window.mainPin.setCheckTail(window.map.isActive);

  window.form.setAddress(window.mainPin.getCoords());
})();
