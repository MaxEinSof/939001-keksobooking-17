'use strict';

(function () {
  function activatePage() {
    if (!window.map.isMapActive()) {
      window.map.activateMap();
      window.map.addPins(window.data);
      window.form.activateAdForm();
    }
  }

  window.mainPin.setMouseDownCallback(activatePage);
  window.mainPin.setMouseMoveCallback(window.form.setAddress);
  window.mainPin.setMouseUpCallback(window.form.setAddress);
  window.mainPin.setCheckTail(window.map.isMapActive);

  window.form.setAddress(window.mainPin.getCoords());
})();
