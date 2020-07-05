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
  var ads = [];

  var clearMap = function () {
    var pins = mapPins.querySelectorAll('.map__pin');
    for (var i = 1; i < pins.length; i++) {
      pins[i].remove();
    }
    var card = document.querySelector('.popup');
    if (card) {
      card.remove();
    }
  };

  var disableMap = function () {
    map.classList.add('map--faded');
    isActive = false;
    clearMap();
    mapPinMain.style.top = startCoords.y;
    mapPinMain.style.left = startCoords.x;
  };

  var enableMap = function () {
    map.classList.remove('map--faded');
    isActive = true;
    window.xhr.load(function (data) {
      ads = data;
      window.filter.init(ads);
      window.filter.onChangeFormFiltration();
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
        enableMap();
        window.form.enableForm();
      }
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      if (!isActive) {
        enableMap();
        window.form.enableForm();
      }
    }
  });

  window.map = {
    map: map,
    mapPins: mapPins,
    mapPinMain: mapPinMain,
    defineCoordinatesMap: defineCoordinatesMap,
    disableMap: disableMap,
    clearMap: clearMap
  };
})();
