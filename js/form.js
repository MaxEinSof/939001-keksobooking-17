'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormInputs = adForm.querySelectorAll('input, select, textarea');
  var addressInput = adForm.querySelector('#address');
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

  window.utility.disableInputs(adFormInputs);

  adTypeSelect.addEventListener('click', onTypeSelectClick);
  adFormTime.addEventListener('click', onAdFormTimeClick);

  function activateAdForm() {
    adForm.classList.remove('ad-form--disabled');
    window.utility.enableInputs(adFormInputs);
  }

  function deactivateAdForm() {
    adForm.classList.add('ad-form--disabled');
    window.utility.disableInputs(adFormInputs);
  }

  function setAddress(pinCoords) {
    addressInput.value = pinCoords.x + ', ' + pinCoords.y;
  }

  function onTypeSelectClick() {
    var minValue = minPrice[adTypeSelect.value];
    adPriceInput.min = minValue;
    adPriceInput.placeholder = minValue;
  }

  function onAdFormTimeClick(evt) {
    var changedSelect = evt.target === timeInSelect ? timeOutSelect : timeInSelect;
    changedSelect.value = evt.target.value;
  }

  window.form = {
    activate: activateAdForm,
    deactivate: deactivateAdForm,
    setAddress: setAddress
  };
})();
