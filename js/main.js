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
    location: {x: getRandomInteger(0, 1200), y: getRandomInteger(130, 630)}
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

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var mapPins = document.querySelector('.map__pins');

function generatePin(similarAd) {
  var pin = pinTemplate.cloneNode(true);
  pin.style = 'left: ' + (similarAd.location.x - (PIN_WIDTH / 2)) + 'px; top: ' + (similarAd.location.y - PIN_HEIGHT) + 'px;';
  pin.children[0].src = similarAd.author.avatar;
  pin.children[0].alt = 'Заголовок объявления';
  return pin;
}

function addPins() {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < data.length; i++) {
    fragment.appendChild(generatePin(data[i]));
  }
  mapPins.appendChild(fragment);
}

addPins();

