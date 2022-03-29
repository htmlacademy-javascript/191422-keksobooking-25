import {choicePopupForm} from './form-popup.js';

const form = document.querySelector('.ad-form');
const fieldTitle = form.querySelector('#title');
const fieldPrice = form.querySelector('#price');
const fieldRoom = form.querySelector('#room_number');
const fieldCapacity = form.querySelector('#capacity');

const quantityCapacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element-error-text',
  errorTextTag: 'p',
});

const titleValidateLength = (value) => value.length >= 30 && value.length <= 100;

const priceValidate = (value) => value >= 0 && value <= 100000;

const quantityCapacityValidate = () => {
  const roomValue = parseInt(fieldRoom.value, 10);
  const capacityValue = parseInt(fieldCapacity.value, 10);

  return quantityCapacity[roomValue].includes(capacityValue);
};

const getRoomErrorMessage = () => {
  const roomValue = parseInt(fieldRoom.value, 10);
  const capacityValue =  parseInt(fieldCapacity.value, 10);

  if (roomValue === 100) {
    return 'Кол-во комнат не для гостей';
  }

  if (capacityValue === 0) {
    return 'Кол-во комнат должно быть 100';
  }

  return 'Кол-во комнат должно быть больше';
};

const getСapacityErrorMessage = () => {
  const roomValue = parseInt(fieldRoom.value, 10);
  const capacityValue =  parseInt(fieldCapacity.value, 10);

  if (roomValue === 100) {
    return 'Кол-во мест не для гостей';
  }

  if (capacityValue === 0) {
    return 'Кол-во комнат должно быть 100';
  }

  return 'Кол-во гостей должно быть меньше';
};

pristine.addValidator(fieldTitle, titleValidateLength, 'Длинна заголовка должна быть от 30 до 100 символов', 2, true);
pristine.addValidator(fieldPrice, priceValidate, 'Цена должна быть от 0 до 100 000', 2, true);
pristine.addValidator(fieldRoom, quantityCapacityValidate, getRoomErrorMessage);
pristine.addValidator(fieldCapacity, quantityCapacityValidate, getСapacityErrorMessage);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  choicePopupForm(isValid);
});
