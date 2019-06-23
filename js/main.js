'use strict';

(function () {
  function activatePage() {
    window.map.activateMap();
    window.map.addPins(window.data);
    window.form.activateAdForm();
  }

  window.map.setMouseDownCallback(activatePage);
  window.map.setMouseMoveCallback(window.form.setAddress);
  window.map.setMouseUpCallback(window.form.setAddress);

  window.form.setAddress(window.map.getCoords());
})();
