'use strict';
(function () {
  window.inclineNumber = function (num, textForms) {
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
})();
