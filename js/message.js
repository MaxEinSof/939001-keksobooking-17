'use strict';

(function () {
  var page = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorMessageElement = errorTemplate.cloneNode(true);
  var errorButton = errorMessageElement.querySelector('.error__button');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successMessageElement = successTemplate.cloneNode(true);
  var currentMessageElement = null;
  var messageElementMap = {
    'success': successMessageElement,
    'error': errorMessageElement
  };

  function showSuccessMessage() {
    showMessage('success');
  }

  function showErrorMessage() {
    showMessage('error');
  }

  function showMessage(type) {
    var messageElement = messageElementMap[type];
    page.appendChild(messageElement);
    currentMessageElement = messageElement;

    if (type === 'error') {
      errorButton.addEventListener('click', onErrorButtonClick);
    }

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentEscPress);
  }

  function onDocumentClick(evt) {
    if (!evt.target.matches('.error *') && !evt.target.matches('.success *')) {
      closeMessage();
    }
  }

  function onDocumentEscPress(evt) {
    if (window.utility.isEscPressed(evt)) {
      closeMessage();
    }
  }

  function onErrorButtonClick(evt) {
    evt.preventDefault();
    closeMessage();
  }

  function closeMessage() {
    currentMessageElement.remove();
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentEscPress);
  }

  window.message = {
    showSuccess: showSuccessMessage,
    showError: showErrorMessage
  };
})();
