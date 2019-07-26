'use strict';

(function () {
  var MainPin = {
    WIDTH: 62,
    HEIGHT: 82
  };
  var StartCoord = {
    X: 570,
    Y: 375
  };
  var BoundingCoord = {
    MIN_X: 0,
    MAX_X: 1200,
    MIN_Y: 130,
    MAX_Y: 630
  };
  var mouseMoveCallback = null;
  var mouseUpCallback = null;
  var hasTail = null;
  var mainPin = document.querySelector('.map__pin--main');

  mainPin.addEventListener('mousedown', onPinMouseDown);

  function onPinMouseDown(evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var pinShift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var currentCoords = {
        x: mainPin.offsetLeft - pinShift.x,
        y: mainPin.offsetTop - pinShift.y
      };

      var isCoordsValid = validateCoords(currentCoords);

      if (isCoordsValid.x) {
        startCoords.x = moveEvt.clientX;
        mainPin.style.left = currentCoords.x + 'px';
      }

      if (isCoordsValid.y) {
        startCoords.y = moveEvt.clientY;
        mainPin.style.top = currentCoords.y + 'px';
      }

      if (mouseMoveCallback) {
        mouseMoveCallback();
      }
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      if (mouseUpCallback) {
        mouseUpCallback();
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  }

  function getCoords() {
    return {
      x: mainPin.offsetLeft + Math.round(MainPin.WIDTH / 2),
      y: mainPin.offsetTop + (hasTail() ? MainPin.HEIGHT : MainPin.HEIGHT / 2)
    };
  }

  function validateCoords(coords) {
    return {
      x: coords.x >= BoundingCoord.MIN_X - MainPin.WIDTH / 2 && coords.x <= BoundingCoord.MAX_X - MainPin.WIDTH / 2,
      y: coords.y >= BoundingCoord.MIN_Y - MainPin.HEIGHT && coords.y <= BoundingCoord.MAX_Y - MainPin.HEIGHT
    };
  }

  function resetPinPosition() {
    mainPin.style.left = StartCoord.X + 'px';
    mainPin.style.top = StartCoord.Y + 'px';
  }

  function setMouseMoveCallback(fn) {
    mouseMoveCallback = fn;
  }

  function setMouseUpCallback(fn) {
    mouseUpCallback = fn;
  }

  function setCheckTail(fn) {
    hasTail = fn;
  }

  window.mainPin = {
    getCoords: getCoords,
    setMouseMoveCallback: setMouseMoveCallback,
    setMouseUpCallback: setMouseUpCallback,
    setCheckTail: setCheckTail,
    resetPosition: resetPinPosition
  };
})();
