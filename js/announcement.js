'use strict';

(function () {
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
  window.announcements = {
    ads: ads,
    mapPins: mapPins,
  };
})();
