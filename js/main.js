'use strict';
var TITLES = ['Сдам жилье', 'Дом в тихом районе', 'Сдается уютная квартира в центре', 'Классное жилье специально для Вас', 'Эта квартирка ждет именно тебя', 'Сдам аппартаменты', 'Огромный пентхаус за разумную цену', 'Маленький домик у парка'];
var PRICES = ['100', '250', '30', '120', '230', '390', '80', '65'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = ['1', '2', '3', '4', '3', '1', '2', '3'];
var GUESTS = ['3', '5', '2', '4', '5', '3', '6', '8'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = CHECKIN;
var FEATURES = ['wifi', 'ishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['квартира в центре города со всеми удобствами', 'жилье в самом центре города', 'домик со всеми удобствами', 'просторное жилище с евроремонтом', 'скромное жилье 36 кв.м.', 'квартира с прекрасным видом из окна', 'подходящее жилье для привередливых гостей', 'жилье класса люкс со всем необходимым'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFSET_X = 25;
var OFFSET_Y = 70;
var offers = [];
var mapPins = document.querySelector('.map__pins');

var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getObjectOffer = function (index) {
  var type = TYPES[getRandomNumber(0, 3)];
  var checkin = CHECKIN[getRandomNumber(0, 2)];
  var checkout = CHECKOUT[getRandomNumber(0, 2)];
  var offsetWidth = mapPins.offsetWidth;
  var location = {
    x: getRandomNumber(0, offsetWidth),
    y: getRandomNumber(130, 630),
  };
  var objectOffer = {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png',
    },
    offer: {
      title: TITLES[index],
      address: location.x + ', ' + location.y,
      price: PRICES[index],
      type: type,
      rooms: ROOMS[index],
      guests: GUESTS[index],
      checkin: checkin,
      checkout: checkout,
      features: FEATURES.slice(getRandomNumber(0, 5)),
      description: DESCRIPTION[index],
      photos: PHOTOS.slice(getRandomNumber(0, 2)),
    },
    location: location,
  };
  return objectOffer;
};

for (var i = 0; i < 8; i++) {
  var element = getObjectOffer(i);
  offers.push(element);
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pin = document.querySelector('#pin').content.querySelector('.map__pin');

var createElement = function (offer) {
  var mapPin = pin.cloneNode(true);
  var left = offer.location.x - OFFSET_X;
  var top = offer.location.y - OFFSET_Y;
  mapPin.style = 'left: ' + left + 'px; top: ' + top + 'px;';
  mapPin.querySelector('img').src = offer.author.avatar;
  mapPin.querySelector('img').alt = offer.offer.title;
  return mapPin;
};

var fragment = document.createDocumentFragment();

for (var j = 0; j < offers.length; j++) {
  var newElement = createElement(offers[j]);
  fragment.appendChild(newElement);
}
mapPins.appendChild(fragment);
