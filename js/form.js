import {modalSuccess, modalError} from './form-modal.js';

const form = document.querySelector('.ad-form');
const fieldTitle = form.querySelector('#title');
const fieldPrice = form.querySelector('#price');
const fieldRoom = form.querySelector('#room_number');
const fieldCapacity = form.querySelector('#capacity');

const QUANTITY_CAPACITY = {
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

const validate = {
  titleLength(value) {
    return value.length >= 30 && value.length <= 100;
  },

  price(value) {
    return value >= 0 && value <= 100000;
  },

  quantityCapacity() {
    const roomValue = parseInt(fieldRoom.value, 10);
    const capacityValue = parseInt(fieldCapacity.value, 10);
    return QUANTITY_CAPACITY[roomValue].includes(capacityValue);
  }
};

const getErrorMessage = {
  room() {
    const roomValue = parseInt(fieldRoom.value, 10);
    const capacityValue =  parseInt(fieldCapacity.value, 10);
    if (roomValue === 100) {
      return 'Кол-во комнат не для гостей';
    }
    if (capacityValue === 0) {
      return 'Кол-во комнат должно быть 100';
    }
    return 'Кол-во комнат должно быть больше';
  },

  capacity() {
    const roomValue = parseInt(fieldRoom.value, 10);
    const capacityValue =  parseInt(fieldCapacity.value, 10);
    if (roomValue === 100) {
      return 'Кол-во мест не для гостей';
    }
    if (capacityValue === 0) {
      return 'Кол-во комнат должно быть 100';
    }
    return 'Кол-во гостей должно быть меньше';
  }
};

pristine.addValidator(fieldTitle, validate.titleLength, 'Длинна заголовка должна быть от 30 до 100 символов', 2, true);
pristine.addValidator(fieldPrice, validate.price, 'Цена должна быть от 0 до 100 000', 2, true);
pristine.addValidator(fieldRoom, validate.quantityCapacity, getErrorMessage.room);
pristine.addValidator(fieldCapacity, validate.quantityCapacity, getErrorMessage.capacity);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    modalSuccess.open();
  } else {
    modalError.open();
  }
});
