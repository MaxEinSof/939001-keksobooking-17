'use strict';

(function () {
  var NUMBER_OF_DISPLAYED_ADS = 5;
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
  var changeCallback = null;
  var filtersForm = document.querySelector('.map__filters');
  var filters = filtersForm.querySelectorAll('input, select');
  var housingTypeFilter = filtersForm.querySelector('#housing-type');
  var housingPriceFilter = filtersForm.querySelector('#housing-price');
  var housingRoomsFilter = filtersForm.querySelector('#housing-rooms');
  var housingGuestsFilter = filtersForm.querySelector('#housing-guests');
  var housingFeaturesFilters = Array.from(filtersForm.querySelectorAll('input[name=features]'));

  window.utility.disableInputs(filters);

  filtersForm.addEventListener('change', onFiltersFormСhange);

  function onFiltersFormСhange() {
    changeCallback();
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
      return advert.offer && hasAdvertTypeMatches(advert) && hasAdvertPriceMatches(advert) && hasAdvertRoomsMatches(advert) && hasAdvertGuestsMatches(advert) && hasAdvertFeaturesMatches(advert, filteredFeatures);
    }).slice(0, NUMBER_OF_DISPLAYED_ADS);
  }

  function hasAdvertTypeMatches(advert) {
    return housingTypeFilter.value === 'any' || advert.offer.type === housingTypeFilter.value;
  }

  function hasAdvertPriceMatches(advert) {
    return housingPriceFilter.value === 'any' || advert.offer.price >= pricesMap[housingPriceFilter.value].min && advert.offer.price <= pricesMap[housingPriceFilter.value].max;
  }

  function hasAdvertRoomsMatches(advert) {
    return housingRoomsFilter.value === 'any' || advert.offer.rooms === parseInt(housingRoomsFilter.value, 10);
  }

  function hasAdvertGuestsMatches(advert) {
    return housingGuestsFilter.value === 'any' || advert.offer.guests === parseInt(housingGuestsFilter.value, 10);
  }

  function hasAdvertFeaturesMatches(advert, filteredFeatures) {
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

  function setChangeCallback(fn) {
    changeCallback = fn;
  }

  window.filter = {
    apply: filtrateData,
    activate: activateFilters,
    deactivate: deactivateFilters,
    setChangeCallback: setChangeCallback
  };
})();
