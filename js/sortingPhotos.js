'use strict';

(function () {
  var photosContainerElement = document.querySelector('.ad-form__photo-container');
  var draggedPhoto = null;
  var draggedPhotoSlot = null;

  photosContainerElement.addEventListener('dragstart', onPhotosContainerElementDragStart);
  photosContainerElement.addEventListener('dragover', onPhotosContainerElementDragOver);
  photosContainerElement.addEventListener('drop', onPhotosContainerElementDrop);

  function onPhotosContainerElementDragStart(evt) {
    if (evt.target.closest('.ad-form__photo')) {
      draggedPhoto = evt.target;
      draggedPhotoSlot = evt.target.parentElement;
    }
  }

  function onPhotosContainerElementDragOver(evt) {
    evt.preventDefault();
  }

  function onPhotosContainerElementDrop(evt) {
    var isDropZoneValid = checkDropZoneValidity(evt);

    if (isDropZoneValid) {
      evt.target.parentElement.appendChild(draggedPhoto);
      draggedPhotoSlot.appendChild(evt.target);
    }
  }

  function checkDropZoneValidity(evt) {
    var photoSlots = Array.from(document.querySelectorAll('.ad-form__photo'));
    return photoSlots.some(function (slot) {
      return slot.children[0] === evt.target;
    });
  }
})();
