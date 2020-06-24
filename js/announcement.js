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
  var MIN_MAP_X = 0;
  var MAX_MAP_X = window.map.mapPins.offsetWidth;
  var MIN_MAP_Y = 130;
  var MAX_MAP_Y = 630;
  var getRandomNumber = window.utils.getRandomNumber;
  var getRandomNumArr = window.utils.getRandomNumArr;
  var ads = [];

  var getAnnouncement = function (index) {
    var location = {
      x: getRandomNumber(MIN_MAP_X, MAX_MAP_X),
      y: getRandomNumber(MIN_MAP_Y, MAX_MAP_Y),
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

  var getAds = function () {
    for (var i = 0; i < 8; i++) {
      var announcement = getAnnouncement(i);
      ads.push(announcement);
    }
  };

  window.announcements = {
    MIN_MAP_X: MIN_MAP_X,
    MAX_MAP_X: MAX_MAP_X,
    MIN_MAP_Y: MIN_MAP_Y,
    MAX_MAP_Y: MAX_MAP_Y,
    getAds: getAds,
    ads: ads
  };
})();
