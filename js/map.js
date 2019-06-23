'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapForm = map.querySelector('.map__filters');
  var mapFormInputs = mapForm.querySelectorAll('input, select');

  window.utility.disableInputs(mapFormInputs);

  function activateMap() {
    map.classList.remove('map--faded');
    window.utility.enableInputs(mapFormInputs);
  }

  function isMapActive() {
    return !map.classList.contains('map--faded');
  }

  function addPins(array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(window.generatePin(array[i]));
    }
    mapPins.appendChild(fragment);
  }

  window.map = {
    activateMap: activateMap,
    isMapActive: isMapActive,
    addPins: addPins
  };
})();
