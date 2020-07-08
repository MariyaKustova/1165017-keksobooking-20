'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var AVATAR_TEMPLATE = 'img/muffin-grey.svg';
  var avatarChooser = window.form.adForm.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = window.form.adForm.querySelector('.ad-form-header__preview img');
  var photoChooser = window.form.adForm.querySelector('.ad-form__upload input[type=file]');
  var previewPhoto = window.form.adForm.querySelector('.ad-form__photo');


  var addAvatar = function (preview, reader) {
    preview.src = reader.result;
  };

  var addPhoto = function (preview, reader) {
    var photo = document.createElement('img');
    photo.src = reader.result;
    photo.style.width = '100%';
    photo.style.height = '100%';
    preview.appendChild(photo);
  };

  var onElementChange = function (input, preview, callback) {
    input.addEventListener('change', function () {
      var file = input.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          callback(preview, reader);
        });
        reader.readAsDataURL(file);
      }
    });
  };

  onElementChange(avatarChooser, previewAvatar, addAvatar);

  onElementChange(photoChooser, previewPhoto, addPhoto);

  var removeImages = function () {
    previewAvatar.src = AVATAR_TEMPLATE;
    var photos = previewPhoto.querySelectorAll('img');
    photos.forEach(function (it) {
      it.remove();
    });
  };

  window.photosLoader = {
    removeImages: removeImages
  };
})();
