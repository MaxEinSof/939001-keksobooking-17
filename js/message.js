'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var page = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorMessage = errorTemplate.cloneNode(true);
  var errorButton = errorMessage.querySelector('.error__button');

  function showErrorMessage() {
    page.appendChild(errorMessage);

    errorButton.addEventListener('click', onErrorButtonClick);
    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', onMessageClick);

    function onErrorButtonClick(evt) {
      evt.preventDefault();
      closeMessage();
    }

    function onMessageEscPress(evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeMessage();
      }
    }

    function onMessageClick(evt) {
      if (!evt.target.matches('.error *')) {
        closeMessage();
      }
    }

    function closeMessage() {
      page.removeChild(errorMessage);
      document.removeEventListener('keydown', onMessageEscPress);
      document.removeEventListener('click', onMessageClick);
    }
  }

  window.message = {
    showError: showErrorMessage
  };
})();
