'use strict';

(function () {
  var inclineNumber = function (num, textForms) {
    num = Math.abs(num) % 100;
    var n1 = num % 10;
    if (num > 10 && num < 20) {
      return textForms.sixToTwenty;
    }
    if (n1 > 1 && n1 < 5) {
      return textForms.oneToFive;
    }
    if (n1 === 1) {
      return textForms.endsOnOne;
    }
    return textForms.sixToTwenty;
  };

  window.utils = {
    inclineNumber: inclineNumber
  };
})();
