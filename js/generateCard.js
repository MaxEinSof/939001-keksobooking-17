'use strict';

(function () {
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

  function generateCard(advert) {
    cardElement = generateCardElement(advert);

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
    if (window.utility.isEscPressed(evt)) {
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

  function generateCardElement(advert) {
    var card = cardTemplate.cloneNode(true);
    var titleElement = card.querySelector('.popup__title');
    var addressElement = card.querySelector('.popup__text--address');
    var priceElement = card.querySelector('.popup__text--price');
    var typeElement = card.querySelector('.popup__type');
    var capacityElement = card.querySelector('.popup__text--capacity');
    var timeElement = card.querySelector('.popup__text--time');
    var descriptionElement = card.querySelector('.popup__description');
    var avatarElement = card.querySelector('.popup__avatar');
    var featuresElement = card.querySelector('.popup__features');
    var photosElement = card.querySelector('.popup__photos');

    titleElement.textContent = advert.offer.title;
    addressElement.textContent = advert.offer.address;
    priceElement.textContent = advert.offer.price + '₽/ночь';
    typeElement.textContent = housingTypeMap[advert.offer.type];
    capacityElement.textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    timeElement.textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    descriptionElement.textContent = advert.offer.description;
    avatarElement.src = advert.author.avatar;

    advert.offer.features.forEach(function (name) {
      featuresElement.appendChild(addFeature(name));
    });

    advert.offer.photos.forEach(function (src) {
      photosElement.appendChild(addPhoto(src));
    });

    var сardBlocks = {
      titleElement: titleElement,
      addressElement: addressElement,
      priceElement: priceElement,
      typeElement: typeElement,
      capacityElement: capacityElement,
      timeElement: timeElement,
      descriptionElement: descriptionElement,
      avatarElement: avatarElement,
      featuresElement: featuresElement,
      photosElement: photosElement
    };

    for (var element in сardBlocks) {
      if (!сardBlocks[element].innerHTML && !сardBlocks[element].src) {
        сardBlocks[element].remove();
      }
    }

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
