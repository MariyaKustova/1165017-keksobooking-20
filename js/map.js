'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');
  var startCoords = {
    x: mapPinMain.style.left,
    y: mapPinMain.style.top
  };
  var isActive = false;

  var disableActiveMode = function () {
    map.classList.add('map--faded');
    isActive = false;
    window.form.disableForm();
    var pins = mapPins.querySelectorAll('.map__pin');
    for (var i = 1; i < pins.length; i++) {
      pins[i].remove();
    }
    var card = document.querySelector('.popup');
    card.remove();
    mapPinMain.style.top = startCoords.y;
    mapPinMain.style.left = startCoords.x;
  };

  var enableActiveMode = function () {
    map.classList.remove('map--faded');
    isActive = true;
    window.form.enableForm();
    window.xhr.load(function (response) {
      var fragment = window.pins.createMapPins(response);
      mapPins.appendChild(fragment);
      window.card.createCard(response[0]);
    }, function (errorMessage) {
      var messageErrorTmpl = document.querySelector('#error-get').content.querySelector('.error');
      var messageError = messageErrorTmpl.cloneNode(true);
      messageError.querySelector('.error__message').textContent += ' ' + errorMessage;
      document.body.appendChild(messageError);
    });
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

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      if (!isActive) {
        enableActiveMode();
      }
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      if (!isActive) {
        enableActiveMode();
      }
    }
  });

  window.map = {
    map: map,
    mapPins: mapPins,
    mapPinMain: mapPinMain,
    defineCoordinatesMap: defineCoordinatesMap,
    disableActiveMode: disableActiveMode,
    isMapActive: isActive
  };
})();
