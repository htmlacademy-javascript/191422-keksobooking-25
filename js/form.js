import {modalSuccess, modalError} from './form-modal.js';
import {sendData} from './api.js';

const noticeFormNode = document.querySelector('.ad-form');
const fieldTitleNode = noticeFormNode.querySelector('#title');
const fieldPriceNode = noticeFormNode.querySelector('#price');
const fieldRoomNode = noticeFormNode.querySelector('#room_number');
const fieldCapacityNode = noticeFormNode.querySelector('#capacity');
const fieldTypeNode = noticeFormNode.querySelector('#type');
const fieldTimeInNode = noticeFormNode.querySelector('#timein');
const fieldTimeOutNode = noticeFormNode.querySelector('#timeout');
const fieldAddressNode = noticeFormNode.querySelector('#address');
const fieldAvatarNode = noticeFormNode.querySelector('#avatar');
const fieldImagesNode = noticeFormNode.querySelector('#images');
const avatarImgNode = noticeFormNode.querySelector('.ad-form-header__preview img');
const photoContainerNode = noticeFormNode.querySelector('.ad-form__photo');
const sliderElementNode = noticeFormNode.querySelector('.ad-form__slider');
const buttonSubmitNode = noticeFormNode.querySelector('button[type="submit"]');
const buttonResetNode = noticeFormNode.querySelector('button[type="reset"]');

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
  buttonSubmitNode.disabled = true;
  buttonSubmitNode.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  buttonSubmitNode.disabled = false;
  buttonSubmitNode.textContent = 'Опубликовать';
};

const pristine = new Pristine(noticeFormNode, {
  classTo: 'validate-container',
  errorTextParent: 'validate-container',
  errorTextClass: 'ad-form__element-error-text',
  errorTextTag: 'p',
});

const validator = {
  isTitileLengthValid(value) {
    return value.length >= 30 && value.length <= 100;
  },

  isPriceValid() {
    const priceValue = parseInt(fieldPriceNode.value, 10);
    const offerTypeValue = fieldTypeNode.value;
    return priceValue >= OFFER_TYPES_PRICE_MIN[offerTypeValue] && priceValue <= MAX_PRICE;
  },

  isQuantityCapacityValid() {
    const roomValue = parseInt(fieldRoomNode.value, 10);
    const capacityValue = parseInt(fieldCapacityNode.value, 10);
    return QUANTITY_CAPACITY[roomValue].includes(capacityValue);
  },

  isImageValid(file) {
    const fileName = file.name.toLowerCase();
    return FILE_TYPES.some((it) => fileName.endsWith(it));
  }
};

const errorMessage = {
  getRoomText() {
    const roomValue = parseInt(fieldRoomNode.value, 10);
    if (roomValue === 100) {
      return 'Кол-во комнат должно быть меньше';
    }
    return 'Кол-во комнат должно быть больше';
  },

  getCapacityText() {
    const roomValue = parseInt(fieldRoomNode.value, 10);
    if (roomValue === 100) {
      return 'или мест должно быть больше';
    }
    return 'или мест должно быть меньше';
  },

  getPriceText() {
    const offerTypeValue = fieldTypeNode.value;
    return `Цена должна быть от ${OFFER_TYPES_PRICE_MIN[offerTypeValue].toLocaleString()} до ${MAX_PRICE.toLocaleString()}`;
  },

  getImageText() {
    return `Файл должен быть в формате ${FILE_TYPES.join(', ')}`;
  }
};

pristine.addValidator(fieldTitleNode, validator.isTitileLengthValid, 'Длинна заголовка должна быть от 30 до 100 символов', 2, true);
pristine.addValidator(fieldPriceNode, validator.isPriceValid, errorMessage.getPriceText, 2, true);
pristine.addValidator(fieldRoomNode, validator.isQuantityCapacityValid, errorMessage.getRoomText);
pristine.addValidator(fieldCapacityNode, validator.isQuantityCapacityValid, errorMessage.getCapacityText);

fieldTypeNode.addEventListener('change', (evt) => {
  const priceMinValue = OFFER_TYPES_PRICE_MIN[evt.target.value];
  fieldPriceNode.placeholder = priceMinValue;
  pristine.validate(fieldPriceNode);
});

fieldTimeInNode.addEventListener('change', (evt) => {
  fieldTimeOutNode.value = evt.target.value;
});

fieldTimeOutNode.addEventListener('change', (evt) => {
  fieldTimeInNode.value = evt.target.value;
});

fieldRoomNode.addEventListener('change', () => {
  pristine.validate(fieldCapacityNode);
});

fieldCapacityNode.addEventListener('change', () => {
  pristine.validate(fieldRoomNode);
});

noUiSlider.create(sliderElementNode, {
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

sliderElementNode.noUiSlider.on('update', () => {
  fieldPriceNode.value = sliderElementNode.noUiSlider.get();
  pristine.validate(fieldPriceNode);
});

fieldAvatarNode.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  const matches = validator.isImageValid(file);

  if (matches) {
    avatarImgNode.src = URL.createObjectURL(file);
  } else {
    pristine.addError(fieldAvatarNode, errorMessage.getImageText());
  }
});

fieldImagesNode.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  const matches = validator.isImageValid(file);

  if (matches) {
    const img = document.createElement('img');

    img.width = 70;
    img.height = 70;
    img.src = URL.createObjectURL(file);
    img.alt = '';

    photoContainerNode.innerHTML = '';
    photoContainerNode.appendChild(img);
  } else {
    pristine.addError(fieldImagesNode, errorMessage.getImageText());
  }
});

const form = {
  _onSubmitCallback: [],
  _onResetCallback: [],

  init() {
    noticeFormNode.addEventListener('submit', (evt) => {
      evt.preventDefault();
      if (!pristine.validate()) {
        return;
      }
      blockSubmitButton();
      sendData(() => this._onSubmitSuccess(), () => this._onSubmitError(), new FormData(evt.target));
    });

    buttonResetNode.addEventListener('click', (evt) => {
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
    noticeFormNode.reset();
    sliderElementNode.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: MAX_PRICE,
      },
      start: 1000,
      step: 1
    });
    avatarImgNode.src = 'img/muffin-grey.svg';
    photoContainerNode.innerHTML = '';
  },

  setAddress(coordinate) {
    fieldAddressNode.value = `${coordinate.lat.toFixed(5)}, ${coordinate.lng.toFixed(5)}`;
  }
};

export {form};
