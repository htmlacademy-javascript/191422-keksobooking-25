import {modalSuccess, modalError} from './form-modal.js';
import {sendData} from './api.js';

const noticeForm = document.querySelector('.ad-form');
const fieldTitle = noticeForm.querySelector('#title');
const fieldPrice = noticeForm.querySelector('#price');
const fieldRoom = noticeForm.querySelector('#room_number');
const fieldCapacity = noticeForm.querySelector('#capacity');
const fieldType = noticeForm.querySelector('#type');
const fieldTimeIn = noticeForm.querySelector('#timein');
const fieldTimeOut = noticeForm.querySelector('#timeout');
const fieldAddress = document.querySelector('#address');
const fieldAvatar = noticeForm.querySelector('#avatar');
const fieldImages = noticeForm.querySelector('#images');
const avatarImg = noticeForm.querySelector('.ad-form-header__preview img');
const photoContainer = noticeForm.querySelector('.ad-form__photo');
const sliderElement = noticeForm.querySelector('.ad-form__slider');
const buttonSubmit = noticeForm.querySelector('button[type="submit"]');
const buttonReset = noticeForm.querySelector('button[type="reset"]');

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

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const MAX_PRICE = 100000;

const blockSubmitButton = () => {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = 'Опубликовать';
};

const pristine = new Pristine(noticeForm, {
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
  },

  isImageValid(file) {
    const fileName = file.name.toLowerCase();
    return FILE_TYPES.some((it) => fileName.endsWith(it));
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
  },

  getImageText() {
    return `Файл должен быть в формате ${FILE_TYPES.join(', ')}`;
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
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: priceMinValue,
      max: MAX_PRICE,
    },
    step: 1
  });
  pristine.validate(fieldPrice);
});

fieldTimeIn.addEventListener('change', (evt) => {
  fieldTimeOut.value = evt.target.value;
});

fieldTimeOut.addEventListener('change', (evt) => {
  fieldTimeIn.value = evt.target.value;
});

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: MAX_PRICE,
  },
  start: 1000,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value)
  },
});

sliderElement.noUiSlider.on('update', () => {
  fieldPrice.value = sliderElement.noUiSlider.get();
});

fieldAvatar.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  const matches = validator.isImageValid(file);

  if (matches) {
    avatarImg.src = URL.createObjectURL(file);
  } else {
    pristine.addError(fieldImages, errorMessage.getImageText());
  }
});

fieldImages.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  const matches = validator.isImageValid(file);

  if (matches) {
    const img = document.createElement('img');

    img.width = 70;
    img.height = 70;
    img.src = URL.createObjectURL(file);
    img.alt = '';

    photoContainer.innerHTML = '';
    photoContainer.appendChild(img);
  } else {
    pristine.addError(fieldImages, errorMessage.getImageText());
  }
});

const form = {
  _onSubmitCallback: [],
  _onResetCallback: [],

  init() {
    noticeForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      if (!pristine.validate()) {
        return;
      }
      blockSubmitButton();
      sendData(() => this._onSubmitSuccess(), () => this._onSubmitError(), new FormData(evt.target));
    });

    buttonReset.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._onReset();
    });
  },

  _onSubmitSuccess() {
    modalSuccess.open();
    this._onSubmitCallback.forEach((cb) => cb());
    unblockSubmitButton();
  },

  _onSubmitError() {
    modalError.open();
    unblockSubmitButton();
  },

  _onReset() {
    this._onResetCallback.forEach((cb) => cb());
  },

  onSubmit(cb) {
    this._onSubmitCallback.push(cb);
  },

  onResetRequest(cb) {
    this._onResetCallback.push(cb);
  },

  reset() {
    noticeForm.reset();
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: MAX_PRICE,
      },
      start: 1000,
      step: 1
    });
    avatarImg.src = 'img/muffin-grey.svg';
    photoContainer.innerHTML = '';
  },

  setAddress(coordinate) {
    fieldAddress.value = `${coordinate.lat.toFixed(5)}, ${coordinate.lng.toFixed(5)}`;
  }
};

export {form};
