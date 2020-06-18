'use strict';

(function () {
  var getRandomNumber = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  var getRandomNumArr = function (element) {
    var randomNumArr = element[getRandomNumber(0, element.length - 1)];
    return randomNumArr;
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

  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomNumArr: getRandomNumArr,
    inclineNumber: inclineNumber
  };
})();
