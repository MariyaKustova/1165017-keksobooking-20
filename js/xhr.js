'use strict';
(function () {
  var URL_BASE = 'https://javascript.pages.academy';
  var URL_GET = URL_BASE + '/keksobooking/data';
  var URL_POST = URL_BASE + '/keksobooking';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var sendRequest = function (method, url, data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, url);
    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  var load = function (onSuccess, onError) {
    sendRequest('GET', URL_GET, null, onSuccess, onError);
  };

  var upload = function (data, onSuccess, onError) {
    sendRequest('POST', URL_POST, data, onSuccess, onError);
  };

  window.xhr = {
    load: load,
    upload: upload
  };
})();
