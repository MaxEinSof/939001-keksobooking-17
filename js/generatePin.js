'use strict';

(function () {
  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  function generatePin(similarAd) {
    var pinElement = generatePinElement(similarAd);
    var clickCallback = null;

    pinElement.addEventListener('click', function () {
      if (clickCallback) {
        clickCallback();
      }

      pinElement.classList.add('map__pin--active');
    });

    function setClickCallback(fn) {
      clickCallback = fn;
    }

    function deactivatePin() {
      pinElement.classList.remove('map__pin--active');
    }

    return {
      element: pinElement,
      setClickCallback: setClickCallback,
      deactivate: deactivatePin
    };
  }

  function generatePinElement(similarAd) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = similarAd.location.x - Pin.WIDTH / 2 + 'px';
    pinElement.style.top = similarAd.location.y - Pin.HEIGHT + 'px';
    pinElement.querySelector('img').src = similarAd.author.avatar;
    pinElement.querySelector('img').alt = similarAd.offer.title;
    pinElement.dataset.pinId = similarAd.id;
    return pinElement;
  }

  window.generatePin = generatePin;
})();
