'use strict';

(function () {
  var ACTIVE_PIN_CLASS_NAME = 'map__pin--active';
  var OFFSET_X = window.map.mapPinMain.offsetWidth / 2;
  var OFFSET_Y = 84;
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');

  var createMapPin = function (card) {
    var mapPin = pin.cloneNode(true);
    var left = card.location.x - OFFSET_X;
    var top = card.location.y - OFFSET_Y;
    mapPin.style = 'left: ' + left + 'px; top: ' + top + 'px;';
    mapPin.querySelector('img').src = card.author.avatar;
    mapPin.querySelector('img').alt = card.offer.title;
    return mapPin;
  };

  var showCard = function (element, mapPin, className) {
    window.card.createCard(element);
    mapPin.classList.add(className);
  };

  var createMapPins = function (ads) {
    var shortList = ads.slice(0, 5);
    var fragment = document.createDocumentFragment();
    shortList.forEach(function (item) {
      var mapPin = createMapPin(item);
      mapPin.addEventListener('mousedown', function (evt) {
        if (evt.button === 0) {
          showCard(item, mapPin, ACTIVE_PIN_CLASS_NAME);
        }
      });
      mapPin.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter') {
          showCard(item, mapPin, ACTIVE_PIN_CLASS_NAME);
        }
      });
      fragment.appendChild(mapPin);
    });
    return fragment;
  };

  var disableHighlightFromActivePin = function () {
    var activePin = window.map.mapPins.querySelector('.' + ACTIVE_PIN_CLASS_NAME);
    if (activePin) {
      activePin.classList.remove(ACTIVE_PIN_CLASS_NAME);
    }
  };

  window.pins = {
    OFFSET_X: OFFSET_X,
    OFFSET_Y: OFFSET_Y,
    createMapPins: createMapPins,
    disableHighlightFromActivePin: disableHighlightFromActivePin
  };
})();
