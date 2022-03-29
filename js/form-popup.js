import {isEscapeKey} from './util.js';

const popupSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const popupErrorTemplate = document.querySelector('#error').content.querySelector('.error');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopupForm();
  }
};

const openPopupForm = (popup) => {
  popup.classList.add('js-popup');
  popup.addEventListener('click', () => {
    closePopupForm();
  });
  document.addEventListener('keydown', onPopupEscKeydown);
  document.body.appendChild(popup);
};

function closePopupForm () {
  const popup = document.querySelector('.js-popup');
  popup.remove();
  document.removeEventListener('keydown', onPopupEscKeydown);
}

const choicePopupForm = (typePopup) => {
  const popup = typePopup ? popupSuccessTemplate.cloneNode(true) : popupErrorTemplate.cloneNode(true);
  openPopupForm(popup);
};

export {choicePopupForm};
