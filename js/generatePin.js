'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var clickCallback = null;

  function generatePin(similarAd) {
    var pinElement = generatePinElement(similarAd);

    pinElement.addEventListener('click', function () {
      pinElement.classList.add('map__pin--active');

      if (clickCallback) {
        clickCallback();
      }
    });

    return {
      element: pinElement,
      setClickCallback: setClickCallback
    };
  }

  function generatePinElement(similarAd) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = similarAd.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = similarAd.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = similarAd.author.avatar;
    pinElement.querySelector('img').alt = similarAd.offer.title;
    pinElement.dataset.pinId = similarAd.id;
    return pinElement;
  }

  function setClickCallback(fn) {
    clickCallback = fn;
  }

  window.generatePin = generatePin;
})();
