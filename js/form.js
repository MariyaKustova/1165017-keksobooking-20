'use strict';

(function () {
  var AD_FORM_DISABLED_CLASS_NAME = 'ad-form--disabled';
  var TermsOfAccommodation = {
    BUNGALO: {
      type: 'bungalo',
      minPrice: 0
    },
    FLAT: {
      type: 'flat',
      minPrice: 1000
    },
    HOUSE: {
      type: 'house',
      minPrice: 5000
    },
    PALACE: {
      type: 'palace',
      minPrice: 10000
    },
  };
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
    if (!adForm.classList.contains(AD_FORM_DISABLED_CLASS_NAME)) {
      adForm.classList.add(AD_FORM_DISABLED_CLASS_NAME);
    }
    disableControls(fieldsets);
    disableControls(selects);
    adForm.reset();
    window.photosLoader.removeImages();
    refreshAddress();
  };

  var enableForm = function () {
    adForm.classList.remove(AD_FORM_DISABLED_CLASS_NAME);
    enableControls(fieldsets);
    enableControls(selects);
  };

  var refreshAddress = function () {
    var coordinates = window.map.defineCoordinatesMap();
    addressInput.value = coordinates.x + ', ' + coordinates.y;
  };

  selectType.addEventListener('change', function () {
    switch (selectType.value) {
      case TermsOfAccommodation.BUNGALO.type:
        priceInput.min = TermsOfAccommodation.BUNGALO.minPrice;
        priceInput.placeholder = TermsOfAccommodation.BUNGALO.minPrice;
        break;
      case TermsOfAccommodation.FLAT.type:
        priceInput.min = TermsOfAccommodation.FLAT.minPrice;
        priceInput.placeholder = TermsOfAccommodation.FLAT.minPrice;
        break;
      case TermsOfAccommodation.HOUSE.type:
        priceInput.min = TermsOfAccommodation.HOUSE.minPrice;
        priceInput.placeholder = TermsOfAccommodation.HOUSE.minPrice;
        break;
      case TermsOfAccommodation.PALACE.type:
        priceInput.min = TermsOfAccommodation.PALACE.minPrice;
        priceInput.placeholder = TermsOfAccommodation.PALACE.minPrice;
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

  var showMessage = function (selector, message) {
    var messageTmpl = document.querySelector('#' + selector).content.querySelector('div');
    var messageDialog = messageTmpl.cloneNode(true);
    if (message) {
      messageDialog.querySelector('p').textContent += ' ' + message;
    }
    document.body.appendChild(messageDialog);
    window.page.addListenerOnRemoveElement(messageDialog);
  };

  adForm.addEventListener('submit', function (evt) {
    window.xhr.upload(new FormData(adForm), function () {
      showMessage('success', null);
      window.page.disablePage();
    }, function () {
      showMessage('error', null);
    });
    evt.preventDefault();
  });

  buttonResetForm.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    window.page.disablePage();
  });

  buttonResetForm.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (evt.button === 0) {
      window.page.disablePage();
    }
  });

  window.form = {
    adForm: adForm,
    enableForm: enableForm,
    disableForm: disableForm,
    refreshAddress: refreshAddress,
    showMessage: showMessage
  };
})();
