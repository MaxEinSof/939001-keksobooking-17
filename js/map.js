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

  function deactivateMap() {
    map.classList.add('map--faded');
    window.utility.disableInputs(mapFormInputs);
  }

  function isMapActive() {
    return !map.classList.contains('map--faded');
  }

  function addPins(array) {
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
