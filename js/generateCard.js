'use strict';

(function () {
  var Photo = {
    WIDTH: 45,
    HEIGHT: 40
  };
  var housingTypeMap = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };
  var cardElement = null;
  var closeCallback = null;
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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
    var cardBlocks = {
      titleElement: card.querySelector('.popup__title'),
      addressElement: card.querySelector('.popup__text--address'),
      priceElement: card.querySelector('.popup__text--price'),
      typeElement: card.querySelector('.popup__type'),
      capacityElement: card.querySelector('.popup__text--capacity'),
      timeElement: card.querySelector('.popup__text--time'),
      descriptionElement: card.querySelector('.popup__description'),
      avatarElement: card.querySelector('.popup__avatar'),
      featuresElement: card.querySelector('.popup__features'),
      photosElement: card.querySelector('.popup__photos')
    };

    cardBlocks.titleElement.textContent = advert.offer.title;
    cardBlocks.addressElement.textContent = advert.offer.address;
    cardBlocks.priceElement.textContent = advert.offer.price + '₽/ночь';
    cardBlocks.typeElement.textContent = housingTypeMap[advert.offer.type];
    cardBlocks.capacityElement.textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    cardBlocks.timeElement.textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    cardBlocks.descriptionElement.textContent = advert.offer.description;
    cardBlocks.avatarElement.src = advert.author.avatar;

    advert.offer.features.forEach(function (name) {
      cardBlocks.featuresElement.appendChild(addFeature(name));
    });

    advert.offer.photos.forEach(function (src) {
      cardBlocks.photosElement.appendChild(addPhoto(src));
    });

    removeEmptyBlocks(cardBlocks);

    return card;
  }

  function removeEmptyBlocks(cardBlocks) {
    for (var element in cardBlocks) {
      if (!cardBlocks[element].innerHTML && !cardBlocks[element].src) {
        cardBlocks[element].remove();
      }
    }
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
