'use strict';
var TITLES = ['Сдам жилье', 'Дом в тихом районе', 'Сдается уютная квартира в центре', 'Классное жилье специально для Вас', 'Эта квартирка ждет именно тебя', 'Сдам аппартаменты', 'Огромный пентхаус за разумную цену', 'Маленький домик у парка'];
var PRICES = ['100', '250', '30', '120', '230', '390', '80', '65'];
var PALACE = 'Дворец';
var FLAT = 'Квартира';
var HOUSE = 'Дом';
var BUNGALO = 'Бунгало';
var TYPES = [PALACE, FLAT, HOUSE, BUNGALO];
var ROOMS = ['1', '2', '3', '4', '3', '1', '2', '3'];
var GUESTS = ['3', '5', '2', '4', '5', '3', '6', '8'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = CHECKIN;
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['квартира в центре города со всеми удобствами', 'жилье в самом центре города', 'домик со всеми удобствами', 'просторное жилище с евроремонтом', 'скромное жилье 36 кв.м.', 'квартира с прекрасным видом из окна', 'подходящее жилье для привередливых гостей', 'жилье класса люкс со всем необходимым'];
var PHOTOS_SRC = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFSET_X = 25;
var OFFSET_Y = 70;
var ads = [];
var mapPins = document.querySelector('.map__pins');

var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getRandomNumArr = function (element) {
  var randomNumArr = element[getRandomNumber(0, element.length - 1)];
  return randomNumArr;
};

var getAnnouncement = function (index) {
  var offsetWidth = mapPins.offsetWidth;
  var location = {
    x: getRandomNumber(0, offsetWidth),
    y: getRandomNumber(130, 630),
  };
  var announcement = {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png',
    },
    offer: {
      title: TITLES[index],
      address: location.x + ', ' + location.y,
      price: getRandomNumArr(PRICES),
      type: getRandomNumArr(TYPES),
      rooms: getRandomNumArr(ROOMS),
      guests: getRandomNumArr(GUESTS),
      checkin: getRandomNumArr(CHECKIN),
      checkout: getRandomNumArr(CHECKOUT),
      features: FEATURES.slice(getRandomNumber(0, FEATURES.length - 1)),
      description: DESCRIPTION[index],
      photos: PHOTOS_SRC.slice(getRandomNumber(0, PHOTOS_SRC.length - 1)),
    },
    location: location,
  };
  return announcement;
};

for (var i = 0; i < 8; i++) {
  var announcement = getAnnouncement(i);
  ads.push(announcement);
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');

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

var fragment = document.createDocumentFragment();

for (var j = 0; j < ads.length; j++) {
  var mapPin = createMapPin(ads[j]);
  fragment.appendChild(mapPin);
}
mapPins.appendChild(fragment);

// Находим шаблон DOM-элемента
var popup = document.querySelector('#card').content.querySelector('.popup');

// Функция создания массива фотографий
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

var inclineNumber = function (num, textForms) {
  num = Math.abs(num) % 100;
  var n1 = num % 10;
  if (num > 10 && num < 20) {
    return textForms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return textForms[1];
  }
  if (n1 === 1) {
    return textForms[0];
  }
  return textForms[2];
};

var createCapacity = function (container, element) {
  if (element.offer.rooms === '' || element.offer.rooms === null || element.offer.rooms === undefined || element.offer.guests === '' || element.offer.guests === null || element.offer.guests === undefined) {
    container.classList.add('hidden');
  } else {
    container.textContent = element.offer.rooms + ' ' + inclineNumber(element.offer.rooms, ['комната', 'комнаты', 'комнат']) + ' для ' +
      element.offer.guests + ' ' + inclineNumber(element.offer.guests, ['гостя', 'гостей', 'гостей']);
  }
};

var createTime = function (container, element) {
  if (element.offer.checkin === '' || element.offer.checkin === null || element.offer.checkin === undefined || element.offer.checkout === '' || element.offer.checkout === null || element.offer.checkout === undefined) {
    container.classList.add('hidden');
  } else {
    container.textContent = 'Заезд до ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
  }
};

var hideUnexistingElement = function (container, value) {
  if (value === '' || value === null || value === undefined) {
    container.classList.add('hidden');
  }
};

var mapFilters = map.querySelector('.map__filters-container');

var createSimpleText = function (container, element) {
  container.textContent = element;
};

// Функция создания одной карточки объявления
var createCard = function (element) {
  var card = popup.cloneNode(true);
  hideUnexistingElement(card.querySelector('.popup__title'), element.offer.title);
  createSimpleText(card.querySelector('.popup__title'), element.offer.title);
  hideUnexistingElement(card.querySelector('.popup__text--address'), element.offer.address);
  createSimpleText(card.querySelector('.popup__text--address'), element.offer.address);
  hideUnexistingElement(card.querySelector('.popup__text--price'), element.offer.price);
  createSimpleText(card.querySelector('.popup__text--price'), element.offer.price + '₽/ночь');
  hideUnexistingElement(card.querySelector('.popup__type'), element.offer.type);
  createSimpleText(card.querySelector('.popup__type'), element.offer.type);
  createCapacity(card.querySelector('.popup__text--capacity'), element);
  createTime(card.querySelector('.popup__text--time'), element);
  createFeatures(card.querySelector('.popup__features'), element);
  hideUnexistingElement(card.querySelector('.popup__description'), element.offer.description);
  createSimpleText(card.querySelector('.popup__description'), element.offer.description);
  createPhotos(card.querySelector('.popup__photos'), element);
  hideUnexistingElement(card.querySelector('.popup__avatar'), element.author.avatar);
  card.querySelector('.popup__avatar').src = element.author.avatar;
  map.insertBefore(card, mapFilters);
};

createCard(ads[0]);
