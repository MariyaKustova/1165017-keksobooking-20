'use strict';

(function () {
  var MIN_Y = window.announcements.MIN_MAP_Y - window.pins.OFFSET_Y;
  var MAX_Y = window.announcements.MAX_MAP_Y - window.pins.OFFSET_Y;
  var MIN_X = window.announcements.MIN_MAP_X - window.pins.OFFSET_X;
  var MAX_X = window.announcements.MAX_MAP_X - window.pins.OFFSET_X;
  var mapPinMain = window.map.mapPinMain;

  var movePin = function (shift) {
    var coordMapY = mapPinMain.offsetTop - shift.y;
    var coordMapX = mapPinMain.offsetLeft - shift.x;
    if (coordMapY > MAX_Y) {
      coordMapY = MAX_Y;
    } else if (coordMapY < MIN_Y) {
      coordMapY = MIN_Y;
    }
    if (coordMapX > MAX_X) {
      coordMapX = MAX_X;
    } else if (coordMapX < MIN_X) {
      coordMapX = MIN_X;
    }
    mapPinMain.style.top = coordMapY + 'px';
    mapPinMain.style.left = coordMapX + 'px';
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      movePin(shift);

      window.form.refreshAddress();
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
