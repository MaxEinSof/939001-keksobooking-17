'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');

  function activateMap() {
    map.classList.remove('map--faded');
  }

  function deactivateMap() {
    map.classList.add('map--faded');
  }

  function isMapActive() {
    return !map.classList.contains('map--faded');
  }

  function addPins(array) {
    var oldPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    oldPins.forEach(function (oldPin) {
      oldPin.remove();
    });

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(window.generatePin(array[i], i));
    }
    mapPins.appendChild(fragment);
  }

  window.map = {
    activate: activateMap,
    deactivate: deactivateMap,
    isActive: isMapActive,
    addPins: addPins
  };
})();
