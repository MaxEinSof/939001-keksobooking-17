'use strict';

(function () {
  function getRandomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  function getRandomElement(array) {
    var randomIndex = window.utility.getRandomInteger(0, array.length - 1);
    return array[randomIndex];
  }

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

  window.utility = {
    getRandomInteger: getRandomInteger,
    getRandomElement: getRandomElement,
    disableInputs: disableInputs,
    enableInputs: enableInputs
  };
})();
