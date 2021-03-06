'use strict';

(function () {
  var MAX_ADS_NUMBER = 5;
  var PriceRange = {
    MIN_VALUE: 10000,
    MIDDLE_VALUE: 50000
  };
  var PriceRangeName = {
    ANY: 'any',
    MIDDLE: 'middle',
    LOW: 'low',
    HIGH: 'high'
  };
  var formFiltration = document.querySelector('.map__filters');
  var housingType = formFiltration.querySelector('#housing-type');
  var housingPrice = formFiltration.querySelector('#housing-price');
  var housingRooms = formFiltration.querySelector('#housing-rooms');
  var housingGuests = formFiltration.querySelector('#housing-guests');
  var housingFeatures = formFiltration.querySelector('#housing-features');
  var ads = [];

  var init = function (data) {
    ads = data;
  };

  var filterPrice = function (price, selectedValue) {
    switch (selectedValue) {
      case PriceRangeName.ANY:
        return true;
      case PriceRangeName.MIDDLE:
        return price >= PriceRange.MIN_VALUE && price < PriceRange.MIDDLE_VALUE;
      case PriceRangeName.LOW:
        return price < PriceRange.MIN_VALUE;
      case PriceRangeName.HIGH:
        return price >= PriceRange.MIDDLE_VALUE;
      default:
        return false;
    }
  };

  var filterFeatures = function (features) {
    var checkboxes = housingFeatures.querySelectorAll('input:checked');
    for (var i = 0; i < checkboxes.length; i++) {
      if (features.indexOf(checkboxes[i].value) === -1) {
        return false;
      }
    }
    return true;
  };

  function filterSimpleValue(offerValue, requestedValue) {
    return requestedValue === 'any' || offerValue === requestedValue;
  }

  function filterNumberValue(offerValue, requestedValue) {
    return requestedValue === 'any' || offerValue === +requestedValue;
  }

  var onChangeFormFiltration = window.debounce(function () {
    window.map.clearMap();

    var result = [];
    for (var i = 0; i < ads.length; i++) {
      if (filterSimpleValue(ads[i].offer.type, housingType.value)
        && filterPrice(ads[i].offer.price, housingPrice.value)
        && filterNumberValue(ads[i].offer.rooms, housingRooms.value)
        && filterNumberValue(ads[i].offer.guests, housingGuests.value)
        && filterFeatures(ads[i].offer.features)) {
        result.push(ads[i]);
      }
      if (result.length === MAX_ADS_NUMBER) {
        break;
      }
    }
    window.map.drawPins(result);
  });

  formFiltration.addEventListener('change', onChangeFormFiltration);

  window.filter = {
    init: init,
    onChangeFormFiltration: onChangeFormFiltration
  };
})();
