'use strict';

var typeLodging = ['palace', 'flat', 'house', 'bungalo'];

function getRandomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function getRandomElement(array) {
  var randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
}

function generateSimilarAd(index) {
  var similarAd = {
    author: {avatar: 'img/avatars/user0' + index + '.png'},
    offer: {type: getRandomElement(typeLodging)},
    location: {x: getRandomInteger(0, 1200), y: getRandomInteger(130, 630)},
    pinId: index
  };
  return similarAd;
}

function generateData() {
  var similarAds = [];
  for (var i = 1, j = 0; i <= 8; i++, j++) {
    similarAds[j] = generateSimilarAd(i);
  }
  return similarAds;
}

var data = generateData();

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

function activateMap() {
  map.classList.remove('map--faded');
  enableInputs(mapFormInputs);
}

function generatePin(similarAd) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.left = similarAd.location.x - PIN_WIDTH / 2 + 'px';
  pin.style.top = similarAd.location.y - PIN_HEIGHT + 'px';
  pin.children[0].src = similarAd.author.avatar;
  pin.children[0].alt = 'Заголовок объявления';
  return pin;
}

function addPins(array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(generatePin(array[i]));
  }
  mapPins.appendChild(fragment);
}

// ------------------------------------- Второе задание ------------------------------------- //

var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var adForm = document.querySelector('.ad-form');
var adFormInputs = adForm.querySelectorAll('input, select, textarea');
var mapForm = map.querySelector('.map__filters');
var mapFormInputs = mapForm.querySelectorAll('input, select');
var mapPinMain = mapPins.querySelector('.map__pin--main');
var addressInput = adForm.querySelector('#address');
var mainPinCoords = getCoords();

disableInputs(adFormInputs);
disableInputs(mapFormInputs);
setAddress(mainPinCoords);

function disableInputs(formInputs) {
  for (var i = 0; i < formInputs.length; i++) {
    formInputs[i].disabled = true;
  }
}

function enableInputs(formInputs) {
  for (var i = 0; i < formInputs.length; i++) {
    formInputs[i].disabled = false;
  }
}

function activateAdForm() {
  adForm.classList.remove('ad-form--disabled');
  enableInputs(adFormInputs);
}

function activatePage() {
  activateMap();
  addPins(data);
  activateAdForm();
}

function setAddress(pinCoords) {
  addressInput.value = pinCoords.x + ', ' + pinCoords.y;
}

function getCoords() {
  return {
    x: mapPinMain.offsetLeft + Math.round(MAIN_PIN_WIDTH / 2),
    y: mapPinMain.offsetTop + MAIN_PIN_HEIGHT
  };
}

// ------------------------------------- Третье задание ------------------------------------- //

var adPriceInput = adForm.querySelector('#price');
var adTypeSelect = adForm.querySelector('#type');
var minPrice = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};
var adFormTime = adForm.querySelector('.ad-form__element--time');
var timeInSelect = adForm.querySelector('#timein');
var timeOutSelect = adForm.querySelector('#timeout');

adTypeSelect.addEventListener('click', onTypeSelectClick);
adFormTime.addEventListener('click', onAdFormTimeClick);

function onTypeSelectClick() {
  var minValue = minPrice[adTypeSelect.value];
  adPriceInput.min = minValue;
  adPriceInput.placeholder = minValue;
}

function onAdFormTimeClick(evt) {
  var changedSelect = evt.target === timeInSelect ? timeOutSelect : timeInSelect;
  changedSelect.value = evt.target.value;
}

// ------------------------------------- Четвёртое задание ------------------------------------- //

var MIN_COORD_X = 0;
var MAX_COORD_X = 1200;
var MIN_COORD_Y = 130;
var MAX_COORD_Y = 630;
var isFirstMove = true;

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

    if (isFirstMove) {
      activatePage();
      isFirstMove = false;
    }

    var pinShift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var currentCoordX = mapPinMain.offsetLeft - pinShift.x;
    var currentCoordY = mapPinMain.offsetTop - pinShift.y;

    if (currentCoordX > MIN_COORD_X && currentCoordX < (MAX_COORD_X - MAIN_PIN_WIDTH)) {
      mapPinMain.style.left = currentCoordX + 'px';
    }
    if (currentCoordY > MIN_COORD_Y && currentCoordY < MAX_COORD_Y) {
      mapPinMain.style.top = currentCoordY + 'px';
    }

    mainPinCoords = getCoords();

    setAddress(mainPinCoords);
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();

    setAddress(mainPinCoords);

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
});
