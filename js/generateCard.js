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
    var сardBlocks = {
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

    сardBlocks.titleElement.textContent = advert.offer.title;
    сardBlocks.addressElement.textContent = advert.offer.address;
    сardBlocks.priceElement.textContent = advert.offer.price + '₽/ночь';
    сardBlocks.typeElement.textContent = housingTypeMap[advert.offer.type];
    сardBlocks.capacityElement.textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    сardBlocks.timeElement.textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    сardBlocks.descriptionElement.textContent = advert.offer.description;
    сardBlocks.avatarElement.src = advert.author.avatar;

    advert.offer.features.forEach(function (name) {
      сardBlocks.featuresElement.appendChild(addFeature(name));
    });

    advert.offer.photos.forEach(function (src) {
      сardBlocks.photosElement.appendChild(addPhoto(src));
    });

    removeEmptyBlocks(сardBlocks);

    return card;
  }

  function removeEmptyBlocks(сardBlocks) {
    for (var element in сardBlocks) {
      if (!сardBlocks[element].innerHTML && !сardBlocks[element].src) {
        сardBlocks[element].remove();
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
