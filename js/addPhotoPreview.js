'use strict';

(function () {
  var fileTypes = ['gif', 'jpg', 'jpeg', 'png'];

  function addPhotoPreview(formElement) {
    var fragment = null;
    var avatarFileChooser = formElement.querySelector('#avatar');
    var avatarElement = formElement.querySelector('.ad-form-header__preview img');
    var photoFileChooser = formElement.querySelector('#images');
    var photoSlotTemplate = formElement.querySelector('.ad-form__photo');
    var photoSlotsContainerElement = formElement.querySelector('.ad-form__photo-container');

    avatarFileChooser.addEventListener('change', onAvatarFileChooserChange);
    photoFileChooser.addEventListener('change', onPhotoFileChooserChange);

    function onAvatarFileChooserChange() {
      addImages(avatarFileChooser, addAvatar);
    }

    function onPhotoFileChooserChange() {
      addImages(photoFileChooser, addPhotos);
    }

    function addImages(fileChooser, callback) {
      var files = Array.from(fileChooser.files);
      var isTypeMatches = checkTypeMatches(files);

      if (isTypeMatches) {
        callback(files);
      }
    }

    function checkTypeMatches(files) {
      var filesNames = files.map(function (file) {
        return file.name.toLowerCase();
      });

      return filesNames.every(function (name) {
        return fileTypes.some(function (type) {
          return name.endsWith(type);
        });
      });
    }

    function addAvatar(files) {
      var reader = new FileReader();

      reader.readAsDataURL(files[0]);
      reader.addEventListener('load', function () {
        avatarElement.src = reader.result;
      });
    }

    function addPhotos(files) {
      fragment = document.createDocumentFragment();

      files.forEach(function (file) {
        addPhoto(file);
      });

      photoSlotTemplate.remove();
      photoSlotsContainerElement.appendChild(fragment);
    }

    function addPhoto(file) {
      var reader = new FileReader();
      var photoElement = createPhotoElement();
      var photoSlot = photoSlotTemplate.cloneNode(true);

      photoSlot.appendChild(photoElement);
      fragment.appendChild(photoSlot);

      reader.readAsDataURL(file);
      reader.addEventListener('load', function () {
        photoElement.src = reader.result;
      });
    }

    function createPhotoElement() {
      var photoElement = document.createElement('img');
      photoElement.alt = 'фотография жилья';
      photoElement.width = 70;
      photoElement.height = 70;
      photoElement.style = 'object-fit: cover';
      return photoElement;
    }

    function removeImages() {
      var photoSlots = document.querySelectorAll('.ad-form__photo');
      photoSlots.forEach(function (slot) {
        slot.remove();
      });
      photoSlotsContainerElement.appendChild(photoSlotTemplate);

      avatarElement.src = 'img/muffin-grey.svg';
    }

    return removeImages;
  }

  window.addPhotoPreview = addPhotoPreview;
})();
