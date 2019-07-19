'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var Photo = {
    WIDTH: 45,
    HEIGHT: 40
  };
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
    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__title').textContent = similarAd.offer.title;
    card.querySelector('.popup__text--address').textContent = similarAd.offer.address;
    card.querySelector('.popup__text--price').textContent = similarAd.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = housingTypeMap[similarAd.offer.type];
    card.querySelector('.popup__text--capacity').textContent = similarAd.offer.rooms + ' комнаты для ' + similarAd.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + similarAd.offer.checkin + ', выезд до ' + similarAd.offer.checkout;
    card.querySelector('.popup__description').textContent = similarAd.offer.description;
    card.querySelector('.popup__avatar').src = similarAd.author.avatar;

    similarAd.offer.features.forEach(function (name) {
      card.querySelector('.popup__features').appendChild(addFeature(name));
    });

    similarAd.offer.photos.forEach(function (src) {
      card.querySelector('.popup__photos').appendChild(addPhoto(src));
    });

    return card;
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
    photoElement.width = Photo.WIDTH;
    photoElement.height = Photo.HEIGHT;
    photoElement.alt = 'Фотография жилья';
    return photoElement;
  }

  window.generateCard = generateCard;
})();
