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
