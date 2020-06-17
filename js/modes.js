'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');
  var fieldsets = document.querySelectorAll('fieldset');
  var selects = document.querySelectorAll('select');
  var addressInput = adForm.querySelector('#address');

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
    window.card.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    enableControls(fieldsets);
    enableControls(selects);
    window.announcements.mapPins.appendChild(window.mapPins.fragment);
    window.card.createCard(window.announcements.ads[0]);
    defineCoordinatesMap();
  };

  var defineCoordinatesMap = function () {
    var coordinateX;
    var coordinateY;
    if (window.card.map.classList.contains('map--faded')) {
      coordinateX = Math.round(parseInt(mapPinMain.style.left, 10) + mapPinMain.offsetWidth / 2);
      coordinateY = Math.round(parseInt(mapPinMain.style.top, 10) + mapPinMain.offsetHeight / 2);
    } else {
      coordinateX = Math.round(parseInt(mapPinMain.style.left, 10) + window.mapPins.OFFSET_X);
      coordinateY = Math.round(parseInt(mapPinMain.style.top, 10) + window.mapPins.OFFSET_Y);
    }
    addressInput.value = coordinateX + ', ' + coordinateY;
  };

  disableControls(fieldsets);
  disableControls(selects);
  defineCoordinatesMap();

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
})();
