'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');
  var fieldsets = document.querySelectorAll('fieldset');
  var selects = document.querySelectorAll('select');

  var disableControls = function (element) {
    element.forEach(function (item) {
      item.disabled = true;
    });
  };

  var enableControls = function (element) {
    element.forEach(function (item) {
      item.disabled = false;
    });
  };

  var enableActiveMode = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    enableControls(fieldsets);
    enableControls(selects);
    mapPins.appendChild(window.pins.fragment);
    window.card.createCard(window.announcements.ads[0]);
    window.form.refreshAddress();
  };

  var defineCoordinatesMap = function () {
    var coordinateX;
    var coordinateY;
    if (map.classList.contains('map--faded')) {
      coordinateX = Math.round(parseInt(mapPinMain.style.left, 10) + window.pins.OFFSET_X);
      coordinateY = Math.round(parseInt(mapPinMain.style.top, 10) + mapPinMain.offsetHeight / 2);
    } else {
      coordinateX = Math.round(parseInt(mapPinMain.style.left, 10) + window.pins.OFFSET_X);
      coordinateY = Math.round(parseInt(mapPinMain.style.top, 10) + window.pins.OFFSET_Y);
    }
    return {
      x: coordinateX,
      y: coordinateY
    };
  };

  var disableMap = function () {
    defineCoordinatesMap();
    disableControls(fieldsets);
    disableControls(selects);
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      enableActiveMode();
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      enableActiveMode();
    }
  });

  window.map = {
    map: map,
    mapPins: mapPins,
    mapPinMain: mapPinMain,
    defineCoordinatesMap: defineCoordinatesMap,
    disableMap: disableMap
  };
})();
