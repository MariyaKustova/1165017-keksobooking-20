'use strict';

(function () {
  var HIDDEN_CLASS_NAME = 'hidden';
  var map = window.map.map;
  var popup = document.querySelector('#card').content.querySelector('.popup');
  var textFormsGuests = {
    oneToFive: 'гостя',
    sixToTwenty: 'гостей',
    endsOnOne: 'гость'
  };
  var textFormsRooms = {
    oneToFive: 'комнаты',
    sixToTwenty: 'комнат',
    endsOnOne: 'комната'
  };

  var createPhotos = function (container, element) {
    var photos = element.offer.photos;
    hideUnexistingElement(container, photos);
    var photoTemplate = container.querySelector('.popup__photo');
    photos.forEach(function (item) {
      var photo = photoTemplate.cloneNode(true);
      photo.src = item;
      container.appendChild(photo);
    });
    photoTemplate.classList.add(HIDDEN_CLASS_NAME);
  };

  var createFeatures = function (container, element) {
    var features = element.offer.features;
    hideUnexistingElement(container, features);
    features.forEach(function (item) {
      container.querySelector('.popup__feature--' + item).classList.remove(HIDDEN_CLASS_NAME);
    });
  };

  var checkEmptyItem = function (element) {
    return (element === null || element === undefined || element.length === 0);
  };

  var createCapacity = function (container, element) {
    if (checkEmptyItem(element.offer.rooms) || checkEmptyItem(element.offer.guests)) {
      container.classList.add(HIDDEN_CLASS_NAME);
    } else {
      container.textContent = element.offer.rooms + ' ' + window.utils.inclineNumber(element.offer.rooms, textFormsRooms) + ' для ' +
        element.offer.guests + ' ' + window.utils.inclineNumber(element.offer.guests, textFormsGuests);
    }
  };

  var createTime = function (container, element) {
    if (checkEmptyItem(element.offer.checkin) || checkEmptyItem(element.offer.checkout)) {
      container.classList.add(HIDDEN_CLASS_NAME);
    } else {
      container.textContent = 'Заезд до ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
    }
  };

  var createAvatar = function (container, element) {
    if (checkEmptyItem(element)) {
      container.classList.add(HIDDEN_CLASS_NAME);
    } else {
      container.src = element;
    }
  };

  var hideUnexistingElement = function (container, element) {
    if (checkEmptyItem(element)) {
      container.classList.add(HIDDEN_CLASS_NAME);
    }
  };

  var createSimpleText = function (container, element) {
    if (checkEmptyItem(element)) {
      container.classList.add(HIDDEN_CLASS_NAME);
    } else {
      container.textContent = element;
    }
  };

  var onKeydownMap = function (evt) {
    if (evt.key === 'Escape') {
      removeCard();
    }
  };

  // Функция удаления карточки объявления
  var removeCard = function () {
    var card = map.querySelector('.map__card');
    if (card) {
      card.remove();
      map.removeEventListener('keydown', onKeydownMap);
    }
  };

  // Функция создания одной карточки объявления
  var createCard = function (element) {
    removeCard();
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
    var closeButton = card.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
      removeCard();
    });
    map.addEventListener('keydown', onKeydownMap);
    window.map.drawCard(card);
  };

  window.card = {
    createCard: createCard,
    removeCard: removeCard
  };
})();
