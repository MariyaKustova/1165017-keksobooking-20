'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var selectType = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var selectTimein = adForm.querySelector('#timein');
  var selectTimeout = adForm.querySelector('#timeout');
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var addressInput = adForm.querySelector('#address');

  var refreshAddress = function () {
    var coordinates = window.map.defineCoordinatesMap();
    addressInput.value = coordinates.x + ', ' + coordinates.y;
  };

  refreshAddress();

  selectType.addEventListener('change', function () {
    switch (selectType.value) {
      case 'bungalo':
        priceInput.min = 0;
        priceInput.placeholder = 0;
        break;
      case 'flat':
        priceInput.min = 1000;
        priceInput.placeholder = 1000;
        break;
      case 'house':
        priceInput.min = 5000;
        priceInput.placeholder = 5000;
        break;
      case 'palace':
        priceInput.min = 10000;
        priceInput.placeholder = 10000;
    }
  });

  var adjustTime = function (time1, time2) {
    time1.addEventListener('change', function () {
      time2.value = time1.value;
    });
  };

  adjustTime(selectTimein, selectTimeout);

  adjustTime(selectTimeout, selectTimein);

  var validateRoomCapacity = function () {
    if (roomNumber.value === '100' && capacity.value !== '0') {
      capacity.setCustomValidity('Единственное допустимое значение - "Не для гостей"');
    } else if (capacity.value === '0' && roomNumber.value !== '100') {
      capacity.setCustomValidity('Минимальное количество гостей для текущего количества комнат - 1');
    } else if (roomNumber.value < capacity.value) {
      capacity.setCustomValidity('Количество гостей должно быть не больше ' + roomNumber.value);
    } else {
      capacity.setCustomValidity('');
    }
  };

  roomNumber.addEventListener('change', validateRoomCapacity);

  capacity.addEventListener('change', validateRoomCapacity);

  window.form = {
    refreshAddress: refreshAddress
  };
})();
