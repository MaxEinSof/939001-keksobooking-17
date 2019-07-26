'use strict';

(function () {
  var NumberOfRooms = {
    MIN: 1,
    MAX: 100
  };
  var minPriceMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var capacityMap = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  var submitCallback = null;
  var resetCallback = null;
  var adForm = document.querySelector('.ad-form');
  var adFormInputs = adForm.querySelectorAll('input, select, textarea');
  var addressInput = adForm.querySelector('#address');
  var adPriceInput = adForm.querySelector('#price');
  var adTypeSelect = adForm.querySelector('#type');
  var adFormTime = adForm.querySelector('.ad-form__element--time');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');
  var roomsSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');
  var submitButton = adForm.querySelector('.ad-form__submit');
  var resetButton = adForm.querySelector('.ad-form__reset');

  var clearPreview = window.addPhotoPreview(adForm);
  window.sortPhotos(adForm);
  setMinPrice();
  validateCapacity();
  window.utility.disableInputs(adFormInputs);

  adForm.addEventListener('change', onAdFormСhange);
  adForm.addEventListener('submit', onAdFormSubmit);
  adTypeSelect.addEventListener('change', onTypeSelectChange);
  adFormTime.addEventListener('click', onAdFormTimeClick);
  submitButton.addEventListener('click', onSubmitButtonClick);
  resetButton.addEventListener('click', onResetButtonClick);

  function onAdFormСhange(evt) {
    if (evt.target === roomsSelect || evt.target === capacitySelect) {
      validateCapacity();
    }

    adFormInputs.forEach(function (input) {
      if (input.classList.contains('invalid-input') && input.validity.valid) {
        input.classList.remove('invalid-input');
      }
    });
  }

  function validateCapacity() {
    var availableCapacity = capacityMap[roomsSelect.value];
    capacitySelect.setCustomValidity('');

    if (!availableCapacity.includes(capacitySelect.value)) {
      var errorMessage = null;

      if (+roomsSelect.value === NumberOfRooms.MIN) {
        errorMessage = 'Ошибка! В ' + roomsSelect.value + ' комнатe может находиться ' + availableCapacity[0] + ' гость';
      } else if (+roomsSelect.value === NumberOfRooms.MAX) {
        errorMessage = 'Ошибка! ' + roomsSelect.value + ' комнат не для гостей';
      } else {
        errorMessage = 'Ошибка! В ' + roomsSelect.value + ' комнатах могут находиться от ' + availableCapacity[0] + ' до ' + availableCapacity[availableCapacity.length - 1] + ' гостей';
      }

      capacitySelect.setCustomValidity(errorMessage);
    }
  }

  function onAdFormSubmit(evt) {
    evt.preventDefault();

    var adFormData = new FormData(adForm);
    submitCallback(adFormData);
  }

  function activateAdForm() {
    adForm.classList.remove('ad-form--disabled');
    window.utility.enableInputs(adFormInputs);
  }

  function deactivateAdForm() {
    clearPreview();
    adForm.reset();
    adForm.classList.add('ad-form--disabled');
    window.utility.disableInputs(adFormInputs);
  }

  function setAddress(coords) {
    addressInput.value = coords.x + ', ' + coords.y;
  }

  function onTypeSelectChange() {
    setMinPrice();
  }

  function setMinPrice() {
    var minPrice = minPriceMap[adTypeSelect.value];
    adPriceInput.min = minPrice;
    adPriceInput.placeholder = minPrice;
  }

  function onAdFormTimeClick(evt) {
    var changedSelect = evt.target === timeInSelect ? timeOutSelect : timeInSelect;
    changedSelect.value = evt.target.value;
  }

  function onSubmitButtonClick() {
    adFormInputs.forEach(function (input) {
      if (!input.validity.valid) {
        input.classList.add('invalid-input');
      }
    });

    var availableCapacity = capacityMap[roomsSelect.value];
    if (!availableCapacity.includes(capacitySelect.value)) {
      capacitySelect.classList.add('invalid-input');
    }
  }

  function onResetButtonClick(evt) {
    evt.preventDefault();

    resetCallback();
  }

  function setSubmitCallback(fn) {
    submitCallback = fn;
  }

  function setResetCallback(fn) {
    resetCallback = fn;
  }

  window.form = {
    activate: activateAdForm,
    deactivate: deactivateAdForm,
    setAddress: setAddress,
    setSubmitCallback: setSubmitCallback,
    setResetCallback: setResetCallback
  };
})();
