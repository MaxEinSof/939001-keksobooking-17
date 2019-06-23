'use strict';

(function () {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 82;
  var MIN_COORD_X = 0;
  var MAX_COORD_X = 1200;
  var MIN_COORD_Y = 130;
  var MAX_COORD_Y = 630;
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapForm = map.querySelector('.map__filters');
  var mapFormInputs = mapForm.querySelectorAll('input, select');
  var mapPinMain = mapPins.querySelector('.map__pin--main');
  var mainPinCoords = getCoords();
  var mouseDownCallback = null;
  var mouseMoveCallback = null;
  var mouseUpCallback = null;


  window.utility.disableInputs(mapFormInputs);

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      if (!isMapActive()) {
        if (mouseDownCallback) {
          mouseDownCallback();
        }
      }

      var pinShift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var currentCoords = {
        x: mapPinMain.offsetLeft - pinShift.x,
        y: mapPinMain.offsetTop - pinShift.y
      };

      var isCoordsValid = validateCoords(currentCoords);

      if (isCoordsValid.x) {
        startCoords.x = moveEvt.clientX;
        mapPinMain.style.left = currentCoords.x + 'px';
      }

      if (isCoordsValid.y) {
        startCoords.y = moveEvt.clientY;
        mapPinMain.style.top = currentCoords.y + 'px';
      }

      if (mouseMoveCallback) {
        mainPinCoords = getCoords();
        mouseMoveCallback(mainPinCoords);
      }
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      if (mouseUpCallback) {
        mainPinCoords = getCoords();
        mouseUpCallback(mainPinCoords);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  });

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

  function getCoords() {
    return {
      x: mapPinMain.offsetLeft + Math.round(MAIN_PIN_WIDTH / 2),
      y: mapPinMain.offsetTop + (isMapActive() ? MAIN_PIN_HEIGHT : MAIN_PIN_HEIGHT / 2)
    };
  }

  function validateCoords(coords) {
    return {
      x: coords.x >= MIN_COORD_X - MAIN_PIN_WIDTH / 2 && coords.x <= MAX_COORD_X - MAIN_PIN_WIDTH / 2,
      y: coords.y >= MIN_COORD_Y - MAIN_PIN_HEIGHT && coords.y <= MAX_COORD_Y - MAIN_PIN_HEIGHT
    };
  }

  function setMouseDownCallback(fn) {
    mouseDownCallback = fn;
  }

  function setMouseMoveCallback(fn) {
    mouseMoveCallback = fn;
  }

  function setMouseUpCallback(fn) {
    mouseUpCallback = fn;
  }

  window.map = {
    activateMap: activateMap,
    addPins: addPins,
    getCoords: getCoords,
    setMouseDownCallback: setMouseDownCallback,
    setMouseMoveCallback: setMouseMoveCallback,
    setMouseUpCallback: setMouseUpCallback
  };
})();
