'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapFiltersElement = map.querySelector('.map__filters-container');
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

  function addPins(array) {
    var oldPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    oldPins.forEach(function (oldPin) {
      oldPin.remove();
    });

    var fragment = document.createDocumentFragment();

    array.forEach(function (object, i) {
      var newPin = window.generatePin(object, i);

      newPin.addEventListener('click', function () {
        addCard(object);
      });

      fragment.appendChild(newPin);
    });

    mapPins.appendChild(fragment);
  }

  function addCard(object) {
    if (activeCard) {
      closeCard();
    }

    activeCard = window.generateCard(object, closeCard);

    document.addEventListener('keydown', onCardEscPress);

    map.insertBefore(activeCard, mapFiltersElement);
  }

  function onCardEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeCard();
    }
  }

  function closeCard() {
    activeCard.remove();
    document.removeEventListener('keydown', onCardEscPress);
  }

  window.map = {
    activate: activateMap,
    deactivate: deactivateMap,
    isActive: isMapActive,
    addPins: addPins,
    addCard: addCard
  };
})();
