'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var MIN_NUMBER_OF_ROOMS = 1;
  var MAX_NUMBER_OF_ROOMS = 100;
  var adForm = document.querySelector('.ad-form');
  var adFormInputs = adForm.querySelectorAll('input, select, textarea');
  var addressInput = adForm.querySelector('#address');
  var adPriceInput = adForm.querySelector('#price');
  var adTypeSelect = adForm.querySelector('#type');
  var minPriceMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var adFormTime = adForm.querySelector('.ad-form__element--time');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');
  var roomsSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');
  var capacityMap = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  var resetButton = adForm.querySelector('.ad-form__reset');
  var successCallback = null;
  var errorCallback = null;
  var resetCallback = null;

  window.utility.disableInputs(adFormInputs);

  adForm.addEventListener('change', onAdFormСhange);
  adForm.addEventListener('submit', onAdFormSubmit);
  adTypeSelect.addEventListener('click', onTypeSelectClick);
  adFormTime.addEventListener('click', onAdFormTimeClick);
  resetButton.addEventListener('click', onResetButtonClick);

  function onAdFormСhange(evt) {
    if (evt.target === roomsSelect || evt.target === capacitySelect) {
      var availableCapacity = capacityMap[roomsSelect.value];
      capacitySelect.setCustomValidity('');

      if (!availableCapacity.includes(capacitySelect.value)) {
        var errorMessage = null;

        if (+roomsSelect.value === MIN_NUMBER_OF_ROOMS) {
          errorMessage = 'Ошибка! В ' + roomsSelect.value + ' комнатe может находиться ' + availableCapacity[0] + ' гость';
        } else if (+roomsSelect.value === MAX_NUMBER_OF_ROOMS) {
          errorMessage = 'Ошибка! ' + roomsSelect.value + ' комнат не для гостей';
        } else {
          errorMessage = 'Ошибка! В ' + roomsSelect.value + ' комнатах могут находиться от ' + availableCapacity[0] + ' до ' + availableCapacity[availableCapacity.length - 1] + ' гостей';
        }

        capacitySelect.setCustomValidity(errorMessage);
      }
    }
  }

  function onAdFormSubmit(evt) {
    evt.preventDefault();

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.open('POST', URL);
    xhr.send(new FormData(adForm));

    xhr.addEventListener('load', onXhrLoad);
    xhr.addEventListener('error', onXhrError);
    xhr.addEventListener('timeout', onXhrTimeout);

    function onXhrLoad() {
      if (xhr.status === 200) {
        successCallback();
      } else {
        errorCallback();
      }
    }

    function onXhrError() {
      errorCallback();
    }

    function onXhrTimeout() {
      errorCallback();
    }
  }

  function activateAdForm() {
    adForm.classList.remove('ad-form--disabled');
    window.utility.enableInputs(adFormInputs);
  }

  function deactivateAdForm() {
    adForm.reset();
    adForm.classList.add('ad-form--disabled');
    window.utility.disableInputs(adFormInputs);
  }

  function setAddress(coords) {
    addressInput.value = coords.x + ', ' + coords.y;
  }

  function onTypeSelectClick() {
    var minValue = minPriceMap[adTypeSelect.value];
    adPriceInput.min = minValue;
    adPriceInput.placeholder = minValue;
  }

  function onAdFormTimeClick(evt) {
    var changedSelect = evt.target === timeInSelect ? timeOutSelect : timeInSelect;
    changedSelect.value = evt.target.value;
  }

  function onResetButtonClick(evt) {
    evt.preventDefault();

    resetCallback();
  }

  function setSuccessCallback(fn) {
    successCallback = fn;
  }

  function setErrorCallback(fn) {
    errorCallback = fn;
  }

  function setResetCallback(fn) {
    resetCallback = fn;
  }

  window.form = {
    activate: activateAdForm,
    deactivate: deactivateAdForm,
    setAddress: setAddress,
    setSuccessCallback: setSuccessCallback,
    setErrorCallback: setErrorCallback,
    setResetCallback: setResetCallback
  };
})();
