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

  var fragment = document.createDocumentFragment();

  for (var j = 0; j < window.announcements.ads.length; j++) {
    var mapPin = createMapPin(window.announcements.ads[j]);
    fragment.appendChild(mapPin);
  }

  window.pins = {
    OFFSET_X: OFFSET_X,
    OFFSET_Y: OFFSET_Y,
    fragment: fragment,
  };
})();
