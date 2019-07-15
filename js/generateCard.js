'use strict';

(function () {
  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;
  var ESC_KEYCODE = 27;
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var housingTypeMap = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };
  var cardElement = null;
  var closeCallback = null;

  function generateCard(similarAd) {
    cardElement = generateCardElement(similarAd);

    cardElement.querySelector('.popup__close').addEventListener('click', function () {
      closeCard();
    });
    document.addEventListener('keydown', onCardEscPress);

    return {
      element: cardElement,
      close: closeCard,
      setCloseCallback: setCloseCallback
    };
  }

  function onCardEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeCard();
    }
  }

  function closeCard() {
    if (closeCallback) {
      closeCallback();
    }

    cardElement.remove();
    document.removeEventListener('keydown', onCardEscPress);
  }

  function setCloseCallback(fn) {
    closeCallback = fn;
  }

  function generateCardElement(similarAd) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = similarAd.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = similarAd.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = similarAd.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = housingTypeMap[similarAd.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = similarAd.offer.rooms + ' комнаты для ' + similarAd.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + similarAd.offer.checkin + ', выезд до ' + similarAd.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = similarAd.offer.description;
    cardElement.querySelector('.popup__avatar').src = similarAd.author.avatar;

    similarAd.offer.features.forEach(function (name) {
      cardElement.querySelector('.popup__features').appendChild(addFeature(name));
    });

    similarAd.offer.photos.forEach(function (src) {
      cardElement.querySelector('.popup__photos').appendChild(addPhoto(src));
    });

    return cardElement;
  }

  function addFeature(name) {
    var featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature');
    featureElement.classList.add('popup__feature--' + name);
    return featureElement;
  }

  function addPhoto(src) {
    var photoElement = document.createElement('img');
    photoElement.src = src;
    photoElement.classList.add('popup__photo');
    photoElement.width = PHOTO_WIDTH;
    photoElement.height = PHOTO_HEIGHT;
    photoElement.alt = 'Фотография жилья';
    return photoElement;
  }

  window.generateCard = generateCard;
})();
