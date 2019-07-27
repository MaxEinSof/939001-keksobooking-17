'use strict';

(function () {
  var pins = [];
  var activeCard = null;
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapFiltersElement = map.querySelector('.map__filters-container');

  function activateMap() {
    map.classList.remove('map--faded');
  }

  function deactivateMap() {
    map.classList.add('map--faded');
    clearMap();
  }

  function clearMap() {
    if (pins.length) {
      removePins();
    }

    if (activeCard) {
      activeCard.close();
    }
  }

  function isMapActive() {
    return !map.classList.contains('map--faded');
  }

  function removePins() {
    pins.forEach(function (pin) {
      pin.remove();
    });

    pins = [];
  }

  function addPins(array) {
    clearMap();

    var fragment = document.createDocumentFragment();

    array.forEach(function (object) {
      var newPin = window.generatePin(object);

      newPin.setClickCallback(function () {
        addCard(object);

        activeCard.setCloseCallback(newPin.deactivate);
      });

      pins.push(newPin.element);

      fragment.appendChild(newPin.element);
    });

    mapPins.appendChild(fragment);
  }

  function addCard(object) {
    if (activeCard) {
      activeCard.close();
    }

    activeCard = window.generateCard(object);
    map.insertBefore(activeCard.element, mapFiltersElement);
  }

  window.map = {
    activate: activateMap,
    deactivate: deactivateMap,
    isActive: isMapActive,
    addPins: addPins
  };
})();
