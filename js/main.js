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
    var filteredData = window.filter.apply(data);
    window.map.addPins(filteredData);
    window.filter.activate();
    window.filter.setСhangeCallback(
        window.debounce(function () {
          filteredData = window.filter.apply(data);
          window.map.addPins(filteredData);
        })
    );
  }

  function onError() {
    window.map.deactivate();
    window.filter.deactivate();
    window.form.deactivate();
    window.message.showError();
  }
})();
