import {modalSuccess, modalError} from './form-modal.js';

const form = document.querySelector('.ad-form');
const fieldTitle = form.querySelector('#title');
const fieldPrice = form.querySelector('#price');
const fieldRoom = form.querySelector('#room_number');
const fieldCapacity = form.querySelector('#capacity');
const fieldType = form.querySelector('#type');
const fieldTimeIn = form.querySelector('#timein');
const fieldTimeOut = form.querySelector('#timeout');

const QUANTITY_CAPACITY = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

const OFFER_TYPES_PRICE_MIN = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const MAX_PRICE = 100000;

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element-error-text',
  errorTextTag: 'p',
});

const validator = {
  isTitileLengthValid(value) {
    return value.length >= 30 && value.length <= 100;
  },

  isPriceValid() {
    const priceValue = parseInt(fieldPrice.value, 10);
    const offerTypeValue = fieldType.value;
    return priceValue >= OFFER_TYPES_PRICE_MIN[offerTypeValue] && priceValue <= MAX_PRICE;
  },

  isQuantityCapacityValid() {
    const roomValue = parseInt(fieldRoom.value, 10);
    const capacityValue = parseInt(fieldCapacity.value, 10);
    return QUANTITY_CAPACITY[roomValue].includes(capacityValue);
  }
};

const errorMessage = {
  getRoomText() {
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

  getCapacityText() {
    const roomValue = parseInt(fieldRoom.value, 10);
    const capacityValue =  parseInt(fieldCapacity.value, 10);
    if (roomValue === 100) {
      return 'Кол-во мест не для гостей';
    }
    if (capacityValue === 0) {
      return 'Кол-во комнат должно быть 100';
    }
    return 'Кол-во гостей должно быть меньше';
  },

  getPriceText() {
    const offerTypeValue = fieldType.value;
    return `Цена должна быть от ${OFFER_TYPES_PRICE_MIN[offerTypeValue].toLocaleString()} до ${MAX_PRICE.toLocaleString()}`;
  }
};

pristine.addValidator(fieldTitle, validator.isTitileLengthValid, 'Длинна заголовка должна быть от 30 до 100 символов', 2, true);
pristine.addValidator(fieldPrice, validator.isPriceValid, errorMessage.getPriceText, 2, true);
pristine.addValidator(fieldRoom, validator.isQuantityCapacityValid, errorMessage.getRoomText);
pristine.addValidator(fieldCapacity, validator.isQuantityCapacityValid, errorMessage.getCapacityText);

fieldType.addEventListener('change', (evt) => {
  const priceMinValue = OFFER_TYPES_PRICE_MIN[evt.target.value];
  fieldPrice.min = priceMinValue;
  fieldPrice.placeholder = priceMinValue;
  pristine.validate(fieldPrice);
});

fieldTimeIn.addEventListener('change', (evt) => {
  fieldTimeOut.value = evt.target.value;
});

fieldTimeOut.addEventListener('change', (evt) => {
  fieldTimeIn.value = evt.target.value;
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    modalSuccess.open();
  } else {
    modalError.open();
  }
});
