'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var NUMBER_OF_DISPLAYED_ADS = 5;
  var mapForm = document.querySelector('.map__filters');
  var mapFilters = mapForm.querySelectorAll('input, select');
  var housingTypeSelect = mapForm.querySelector('#housing-type');
  var selectСhangeCallback = null;
  var lastTimeout = null;

  housingTypeSelect.addEventListener('change', onHousingTypeSelectСhange);

  function onHousingTypeSelectСhange() {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      selectСhangeCallback();
    }, DEBOUNCE_INTERVAL);
  }

  function filtrateData(array) {
    return array.filter(function (advert) {
      return housingTypeSelect.value !== 'any' ? advert.offer.type === housingTypeSelect.value : true;
    }).slice(0, NUMBER_OF_DISPLAYED_ADS);
  }

  function activateFilters() {
    window.utility.enableInputs(mapFilters);
  }

  function setSelectСhangeCallback(fn) {
    selectСhangeCallback = fn;
  }

  window.filter = {
    apply: filtrateData,
    activate: activateFilters,
    setSelectСhangeCallback: setSelectСhangeCallback
  };

})();
