'use strict';

(function () {
  var typeLodging = ['palace', 'flat', 'house', 'bungalo'];

  function generateSimilarAd(index) {
    var similarAd = {
      author: {avatar: 'img/avatars/user0' + index + '.png'},
      offer: {type: window.utility.getRandomElement(typeLodging)},
      location: {x: window.utility.getRandomInteger(0, 1200), y: window.utility.getRandomInteger(130, 630)},
      id: index
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

  window.data = generateData();
})();
