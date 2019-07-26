'use strict';

(function () {
  window.mainPin.setMouseMoveCallback(function () {
    if (!window.map.isActive()) {
      activatePage();
    }
    window.form.setAddress(window.mainPin.getCoords());
  });
  window.mainPin.setMouseUpCallback(function () {
    window.form.setAddress(window.mainPin.getCoords());
  });
  window.mainPin.setCheckTail(window.map.isActive);

  window.form.setAddress(window.mainPin.getCoords());

  function activatePage() {
    window.map.activate();
    window.form.activate();
    window.server.load(onSuccess, onError);
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
    window.filter.activate();
    var filteredData = window.filter.apply(data);
    window.map.addPins(filteredData);
    window.filter.setChangeCallback(
        window.debounce(function () {
          filteredData = window.filter.apply(data);
          window.map.addPins(filteredData);
        })
    );
    window.form.setSubmitCallback(function (adFormData) {
      window.server.upload(adFormData, function () {
        resetPage();
        window.message.showSuccess();
      }, window.message.showError);
    });
    window.form.setResetCallback(resetPage);
  }

  function onError() {
    resetPage();
    window.message.showError();
  }
})();
