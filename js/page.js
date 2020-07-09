'use strict';
(function () {
  var enablePage = function () {
    window.map.enableMap();
    window.form.enableForm();
  };

  var disablePage = function () {
    window.map.disableMap();
    window.form.disableForm();
  };

  var onDocumentClick = function (element) {
    document.addEventListener('mousedown', function (evt) {
      if (evt.button === 0) {
        element.remove();
      }
    });
  };

  var onDocumentKeydown = function (element) {
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        element.remove();
      }
    });
  };

  var addListenerOnRemoveElement = function (element) {
    onDocumentClick(element);
    onDocumentKeydown(element);
  };

  window.page = {
    enablePage: enablePage,
    disablePage: disablePage,
    addListenerOnRemoveElement: addListenerOnRemoveElement
  };
})();
