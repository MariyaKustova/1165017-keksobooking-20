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
  var buttonResetForm = adForm.querySelector('.ad-form__reset');
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
    if (!adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.add('ad-form--disabled');
    }
    disableControls(fieldsets);
    disableControls(selects);
    adForm.reset();
    refreshAddress();
  };

  var enableForm = function () {
    adForm.classList.remove('ad-form--disabled');
    enableControls(fieldsets);
    enableControls(selects);
  };

  var refreshAddress = function () {
    var coordinates = window.map.defineCoordinatesMap();
    addressInput.value = coordinates.x + ', ' + coordinates.y;
  };

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

  var onDocumentClick = function (element) {
    document.addEventListener('click', function () {
      element.remove();
    });
  };

  var onDocumentKeydown = function (element) {
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        element.remove();
      }
    });
  };

  var showMessageSuccess = function () {
    var messageSuccessTmpl = document.querySelector('#success').content.querySelector('.success');
    var messageSuccess = messageSuccessTmpl.cloneNode(true);
    document.body.appendChild(messageSuccess);
    onDocumentClick(messageSuccess);
    onDocumentKeydown(messageSuccess);
  };

  adForm.addEventListener('submit', function (evt) {
    window.xhr.upload(new FormData(adForm), function () {
      showMessageSuccess();
      window.map.disableMap();
      disableForm();
    }, function () {
      var messageErrorTmpl = document.querySelector('#error').content.querySelector('.error');
      var messageError = messageErrorTmpl.cloneNode(true);
      document.body.appendChild(messageError);
      onDocumentClick(messageError);
      onDocumentKeydown(messageError);
    });
    evt.preventDefault();
  });

  buttonResetForm.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    window.map.disableMap();
    disableForm();
  });

  buttonResetForm.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (evt.button === 0) {
      window.map.disableMap();
      disableForm();
    }
  });

  window.form = {
    enableForm: enableForm,
    disableForm: disableForm,
    refreshAddress: refreshAddress
  };
})();
