'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');
  var startCoords = {
    x: mapPinMain.style.left,
    y: mapPinMain.style.top
  };
  var isActive = false;

  var clearMap = function () {
    var pins = mapPins.querySelectorAll('.map__pin');
    for (var i = 1; i < pins.length; i++) {
      pins[i].remove();
    }
    window.card.removeCard();
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
      window.filter.init(data);
      window.filter.onChangeFormFiltration();
    }, function (errorMessage) {
      var messageErrorTmpl = document.querySelector('#error-get').content.querySelector('.error');
      var messageError = messageErrorTmpl.cloneNode(true);
      messageError.querySelector('.error__message').textContent += ' ' + errorMessage;
      document.body.appendChild(messageError);
      window.page.addLisenerOnRemoveElement(messageError);
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
        window.page.enablePage();
      }
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      if (!isActive) {
        window.page.enablePage();
      }
    }
  });

  var drawPins = function (result) {
    var fragment = window.pins.createMapPins(result);
    mapPins.appendChild(fragment);
  };

  var drawCard = function (card) {
    map.insertBefore(card, mapFiltersContainer);
  };

  window.map = {
    map: map,
    mapPins: mapPins,
    mapPinMain: mapPinMain,
    defineCoordinatesMap: defineCoordinatesMap,
    enableMap: enableMap,
    disableMap: disableMap,
    clearMap: clearMap,
    drawPins: drawPins,
    drawCard: drawCard
  };
})();
