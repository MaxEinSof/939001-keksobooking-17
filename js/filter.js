'use strict';

(function () {
  var NUMBER_OF_DISPLAYED_ADS = 5;
  var mapForm = document.querySelector('.map__filters');
  var mapFilters = mapForm.querySelectorAll('input, select');
  var housingTypeFilter = mapForm.querySelector('#housing-type');
  var housingPriceFilter = mapForm.querySelector('#housing-price');
  var housingRoomsFilter = mapForm.querySelector('#housing-rooms');
  var housingGuestsFilter = mapForm.querySelector('#housing-guests');
  var housingFeaturesFilters = Array.from(mapForm.querySelectorAll('input[name=features]'));
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

  window.utility.disableInputs(mapFilters);

  mapForm.addEventListener('change', onMapFormСhange);

  function onMapFormСhange() {
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
    return housingRoomsFilter.value === 'any' || advert.offer.rooms == housingRoomsFilter.value;
  }

  function isAdvertGuestsMatches(advert) {
    return housingGuestsFilter.value === 'any' || advert.offer.guests == housingGuestsFilter.value;
  }

  function isAdvertFeaturesMatches(advert, filteredFeatures) {
    return filteredFeatures.every(function (feature) {
      return advert.offer.features.includes(feature);
    });
  }

  function activateFilters() {
    window.utility.enableInputs(mapFilters);
  }

  function deactivateFilters() {
    window.utility.disableInputs(mapFilters);
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
