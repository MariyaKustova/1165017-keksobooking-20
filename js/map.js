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

  var disableForm = function () {
    disableControls(fieldsets);
    disableControls(selects);
  };

  var disableActiveMode = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    disableForm();
  };

  var enableActiveMode = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    enableControls(fieldsets);
    enableControls(selects);
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
    disableForm: disableForm,
    disableActiveMode: disableActiveMode
  };
})();
