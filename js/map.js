'use strict';

(function () {
  var ESC_KEYCODE = 27;
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

    array.forEach(function (object, i) {
      var newPin = window.generatePin(object, i);

      newPin.addEventListener('click', function () {
        var mapCard = map.querySelector('.map__card');
        if (mapCard) {
          mapCard.remove();
        }
        addCard(object);
      });

      fragment.appendChild(newPin);
    });

    mapPins.appendChild(fragment);
  }

  function addCard(object) {
    var newCard = window.generateCard(object);

    newCard.querySelector('.popup__close').addEventListener('click', function () {
      closeCard();
    });
    document.addEventListener('keydown', onCardEscPress);

    function onCardEscPress(evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeCard();
      }
    }

    function closeCard() {
      newCard.remove();
      document.removeEventListener('keydown', onCardEscPress);
    }

    map.insertBefore(newCard, document.querySelector('.map__filters-container'));
  }

  window.map = {
    activate: activateMap,
    deactivate: deactivateMap,
    isActive: isMapActive,
    addPins: addPins,
    addCard: addCard
  };
})();
