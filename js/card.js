'use strict';

(function () {
  var map = window.map.map;
  var popup = document.querySelector('#card').content.querySelector('.popup');

  var createPhotos = function (container, element) {
    var photos = element.offer.photos;
    hideUnexistingElement(container, photos);
    var photoTemplate = container.querySelector('.popup__photo');
    photos.forEach(function (item) {
      var photo = photoTemplate.cloneNode(true);
      photo.src = item;
      container.appendChild(photo);
    });
    photoTemplate.classList.add('hidden');
  };

  var createFeatures = function (container, element) {
    var features = element.offer.features;
    hideUnexistingElement(container, features);
    var facilities = container.querySelectorAll('.popup__feature');
    facilities.forEach(function (item) {
      item.classList.add('hidden');
    });
    features.forEach(function (item) {
      container.querySelector('.popup__feature--' + item).classList.remove('hidden');
    });
  };

  var checkEmptyItem = function (element) {
    if (element === '' || element === null || element === undefined) {
      return true;
    } else {
      return false;
    }
  };

  var createCapacity = function (container, element) {
    if (checkEmptyItem(element.offer.rooms) || checkEmptyItem(element.offer.guests)) {
      container.classList.add('hidden');
    } else {
      container.textContent = element.offer.rooms + ' ' + window.utils.inclineNumber(element.offer.rooms, ['комната', 'комнаты', 'комнат']) + ' для ' +
        element.offer.guests + ' ' + window.utils.inclineNumber(element.offer.guests, ['гостя', 'гостей', 'гостей']);
    }
  };

  var createTime = function (container, element) {
    if (checkEmptyItem(element.offer.checkin) || checkEmptyItem(element.offer.checkout)) {
      container.classList.add('hidden');
    } else {
      container.textContent = 'Заезд до ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
    }
  };

  var createAvatar = function (container, element) {
    if (checkEmptyItem(element)) {
      container.classList.add('hidden');
    } else {
      container.src = element;
    }
  };

  var hideUnexistingElement = function (container, element) {
    if (checkEmptyItem(element)) {
      container.classList.add('hidden');
    }
  };

  var mapFiltersContainer = map.querySelector('.map__filters-container');

  var createSimpleText = function (container, element) {
    if (checkEmptyItem(element)) {
      container.classList.add('hidden');
    } else {
      container.textContent = element;
    }
  };

  // Функция создания одной карточки объявления
  var createCard = function (element) {
    var card = popup.cloneNode(true);
    createSimpleText(card.querySelector('.popup__title'), element.offer.title);
    createSimpleText(card.querySelector('.popup__text--address'), element.offer.address);
    createSimpleText(card.querySelector('.popup__text--price'), element.offer.price + '₽/ночь');
    createSimpleText(card.querySelector('.popup__type'), element.offer.type);
    createCapacity(card.querySelector('.popup__text--capacity'), element);
    createTime(card.querySelector('.popup__text--time'), element);
    createFeatures(card.querySelector('.popup__features'), element);
    createSimpleText(card.querySelector('.popup__description'), element.offer.description);
    createPhotos(card.querySelector('.popup__photos'), element);
    createAvatar(card.querySelector('.popup__avatar'), element.author.avatar);
    map.insertBefore(card, mapFiltersContainer);
  };

  window.card = {
    map: map,
    createCard: createCard,
  };
})();
