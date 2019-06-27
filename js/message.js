'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var page = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorMessageElement = errorTemplate.cloneNode(true);
  var errorButton = errorMessageElement.querySelector('.error__button');

  function showErrorMessageElement() {
    page.appendChild(errorMessageElement);

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
      errorMessageElement.remove();
      document.removeEventListener('keydown', onMessageEscPress);
      document.removeEventListener('click', onMessageClick);
    }
  }

  window.message = {
    showError: showErrorMessageElement
  };
})();
