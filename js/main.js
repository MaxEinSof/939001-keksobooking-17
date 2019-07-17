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

  function resetPage() {
    window.map.deactivate();
    window.filter.deactivate();
    window.form.deactivate();
    window.mainPin.resetPosition();
    window.form.setAddress(window.mainPin.getCoords());
  }

  function onSuccess(data) {
    window.utility.setIds(data);
    var filteredData = window.filter.apply(data);
    window.map.addPins(filteredData);
    window.filter.activate();
    window.filter.setСhangeCallback(
        window.debounce(function () {
          filteredData = window.filter.apply(data);
          window.map.addPins(filteredData);
        })
    );
    window.form.setSuccessCallback(function () {
      resetPage();
      window.message.showSuccess();
    });
    window.form.setErrorCallback(window.message.showError);
    window.form.setResetCallback(resetPage);
  }

  function onError() {
    resetPage();
    window.message.showError();
  }
})();
