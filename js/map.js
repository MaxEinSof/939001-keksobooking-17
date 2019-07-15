'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapFiltersElement = map.querySelector('.map__filters-container');
  var pins = [];
  var activeCard = null;

  function activateMap() {
    map.classList.remove('map--faded');
  }

  function deactivateMap() {
    map.classList.add('map--faded');
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
    if (+pins.length) {
      removePins();
    }

    var fragment = document.createDocumentFragment();

    array.forEach(function (object) {
      var newPin = window.generatePin(object);

      newPin.setClickCallback(function () {
        addCard(object);
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

    activeCard.setCloseCallback(function () {
      newPin.element.classList.remove('map__pin--active');
    });

    map.insertBefore(activeCard.element, mapFiltersElement);
  }

  window.map = {
    activate: activateMap,
    deactivate: deactivateMap,
    isActive: isMapActive,
    addPins: addPins,
    addCard: addCard
  };
})();
