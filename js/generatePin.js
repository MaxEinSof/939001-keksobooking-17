'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  function generatePin(similarAd, id) {
    var pin = pinTemplate.cloneNode(true);
    pin.style.left = similarAd.location.x - PIN_WIDTH / 2 + 'px';
    pin.style.top = similarAd.location.y - PIN_HEIGHT + 'px';
    pin.querySelector('img').src = similarAd.author.avatar;
    pin.querySelector('img').alt = similarAd.offer.title;
    pin.dataset.pinId = id;
    return pin;
  }

  window.generatePin = generatePin;
})();
