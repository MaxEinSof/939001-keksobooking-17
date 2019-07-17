'use strict';

(function () {
  var NUMBER_OF_DISPLAYED_ADS = 5;
  var filtersForm = document.querySelector('.map__filters');
  var filters = filtersForm.querySelectorAll('input, select');
  var housingTypeFilter = filtersForm.querySelector('#housing-type');
  var housingPriceFilter = filtersForm.querySelector('#housing-price');
  var housingRoomsFilter = filtersForm.querySelector('#housing-rooms');
  var housingGuestsFilter = filtersForm.querySelector('#housing-guests');
  var housingFeaturesFilters = Array.from(filtersForm.querySelectorAll('input[name=features]'));
  var сhangeCallback = null;
  var pricesMap = {
    'middle': {
      min: 10000,
      max: 50000
    },
    'low': {
      min: 0,
      max: 10000
    },
    'high': {
      min: 50000,
      max: Infinity
    }
  };

  window.utility.disableInputs(filters);

  filtersForm.addEventListener('change', onFiltersFormСhange);

  function onFiltersFormСhange() {
    сhangeCallback();
  }

  function getFilteredFeatures() {
    return housingFeaturesFilters.filter(function (filter) {
      return filter.checked;
    }).map(function (filter) {
      return filter.value;
    });
  }

  function filtrateData(array) {
    var filteredFeatures = getFilteredFeatures();

    return array.filter(function (advert) {
      return isAdvertTypeMatches(advert) && isAdvertPriceMatches(advert) && isAdvertRoomsMatches(advert) && isAdvertGuestsMatches(advert) && isAdvertFeaturesMatches(advert, filteredFeatures);
    }).slice(0, NUMBER_OF_DISPLAYED_ADS);
  }

  function isAdvertTypeMatches(advert) {
    return housingTypeFilter.value === 'any' || advert.offer.type === housingTypeFilter.value;
  }

  function isAdvertPriceMatches(advert) {
    return housingPriceFilter.value === 'any' || advert.offer.price >= pricesMap[housingPriceFilter.value].min && advert.offer.price <= pricesMap[housingPriceFilter.value].max;
  }

  function isAdvertRoomsMatches(advert) {
    return housingRoomsFilter.value === 'any' || advert.offer.rooms === parseInt(housingRoomsFilter.value, 10);
  }

  function isAdvertGuestsMatches(advert) {
    return housingGuestsFilter.value === 'any' || advert.offer.guests === parseInt(housingGuestsFilter.value, 10);
  }

  function isAdvertFeaturesMatches(advert, filteredFeatures) {
    return filteredFeatures.every(function (feature) {
      return advert.offer.features.includes(feature);
    });
  }

  function activateFilters() {
    window.utility.enableInputs(filters);
  }

  function deactivateFilters() {
    filtersForm.reset();
    window.utility.disableInputs(filters);
  }

  function setСhangeCallback(fn) {
    сhangeCallback = fn;
  }

  window.filter = {
    apply: filtrateData,
    activate: activateFilters,
    deactivate: deactivateFilters,
    setСhangeCallback: setСhangeCallback
  };
})();
