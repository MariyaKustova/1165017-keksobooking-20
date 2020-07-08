'use strict';

(function () {
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var OFFSET_X = window.map.mapPinMain.offsetWidth / 2;
  var OFFSET_Y = 84;

  var createMapPin = function (card) {
    var mapPin = pin.cloneNode(true);
    var left = card.location.x - OFFSET_X;
    var top = card.location.y - OFFSET_Y;
    mapPin.style = 'left: ' + left + 'px; top: ' + top + 'px;';
    mapPin.querySelector('img').src = card.author.avatar;
    mapPin.querySelector('img').alt = card.offer.title;
    return mapPin;
  };

  var createMapPins = function (ads) {
    var shortList = ads.slice(0, 5);
    var fragment = document.createDocumentFragment();
    shortList.forEach(function (item) {
      var mapPin = createMapPin(item);
      mapPin.addEventListener('mousedown', function (evt) {
        if (evt.button === 0) {
          window.card.createCard(item);
        }
      });
      mapPin.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter') {
          window.card.createCard(item);
        }
      });
      fragment.appendChild(mapPin);
    });
    return fragment;
  };

  window.pins = {
    OFFSET_X: OFFSET_X,
    OFFSET_Y: OFFSET_Y,
    createMapPins: createMapPins
  };
})();
