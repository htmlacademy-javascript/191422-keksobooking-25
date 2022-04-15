import {util} from './util.js';

const OFFER_TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};

const cardTemplateNode = document.querySelector('#card').content.querySelector('.popup');
const cardPhotoTemplateNode = cardTemplateNode.querySelector('.popup__photo');

const cardsGenerator = {
  createCards(offers) {
    const cardsFragment = document.createDocumentFragment();
    offers.forEach((offer) => {
      cardsFragment.appendChild(this.createSingleCard(offer));
    });
    return cardsFragment;
  },

  createSingleCard(offer) {
    const card = cardTemplateNode.cloneNode(true);
    const author = offer.author;
    offer = offer.offer;

    this.setCardTitle(card, offer);
    this.setCardAddress(card, offer);
    this.setCardPrice(card, offer);
    this.setCardType(card, offer);
    this.setCardCapacity(card, offer);
    this.setCardTime(card, offer);
    this.setCardFeatures(card, offer);
    this.setCardDescription(card, offer);
    this.setCardPhotos(card, offer);
    this.setCardAvatar(card, author);

    return card;
  },

  setCardTitle(card, offer) {
    const titleNode = card.querySelector('.popup__title');
    titleNode.textContent = offer.title ? offer.title : 'Объявление';
  },

  setCardAddress(card, offer) {
    const addressNode = card.querySelector('.popup__text--address');
    addressNode.textContent = offer.address ? offer.address : 'Точный адрес не указан';
  },

  setCardPrice(card, offer) {
    const priceNode = card.querySelector('.popup__text--price');
    priceNode.innerHTML = offer.price ? `${offer.price.toLocaleString()} <span>₽/ночь</span>` : 'Цена не указана';
  },

  setCardType(card, offer) {
    const typeNode = card.querySelector('.popup__type');

    if (offer.type && OFFER_TYPES[offer.type]) {
      typeNode.textContent = OFFER_TYPES[offer.type];
    } else {
      this._hideElement(typeNode);
    }
  },

  setCardCapacity(card, offer) {
    const capacityNode = card.querySelector('.popup__text--capacity');
    const result = [];

    if (offer.rooms) {
      result.push(`${offer.rooms} ${util.setEndWord(offer.rooms, ['комната', 'комнаты', 'комнат'])}`);
    }

    if (offer.guests) {
      result.push(`для ${offer.guests} ${util.setEndWord(offer.guests, ['гостя', 'гостей', 'гостей'])}`);
    }

    capacityNode.textContent = result.join(' ');
  },

  setCardTime(card, offer) {
    const timeNode = card.querySelector('.popup__text--time');
    const result = [];

    if (offer.checkin) {
      result.push(`Заезд после ${offer.checkin}`);
    }

    if (offer.checkout) {
      result.push(`выезд до ${offer.checkout}`);
    }

    timeNode.textContent = result.join(', ');
  },

  setCardFeatures(card, offer) {
    const featuresNode = card.querySelector('.popup__features');
    const featuresListNode = featuresNode.querySelectorAll('.popup__feature');

    if (offer.features) {
      const featuresmModifiers = offer.features.map((feature) => `popup__feature--${feature}`);
      featuresListNode.forEach((featureItem) => {
        const modifier = featureItem.classList[1];

        if (!featuresmModifiers.includes(modifier)) {
          featureItem.remove();
        }
      });
    } else {
      this._hideElement(featuresNode);
    }
  },

  setCardDescription(card, offer) {
    const descriptionNode = card.querySelector('.popup__description');

    if (offer.description) {
      descriptionNode.textContent = offer.description;
    } else {
      this._hideElement(descriptionNode);
    }
  },

  setCardPhotos(card, offer) {
    const photosNode = card.querySelector('.popup__photos');

    if (offer.photos) {
      const cardPhotosFragment = document.createDocumentFragment();

      photosNode.textContent = '';

      offer.photos.forEach((photoSrc) => {
        const cardPhotoElement = cardPhotoTemplateNode.cloneNode(true);
        cardPhotoElement.src = photoSrc;
        cardPhotosFragment.appendChild(cardPhotoElement);
      });

      photosNode.appendChild(cardPhotosFragment);
    } else {
      this._hideElement(photosNode);
    }
  },

  setCardAvatar(card, author) {
    const avatarNode = card.querySelector('.popup__avatar');
    avatarNode.src = author.avatar ? author.avatar : 'img/avatars/default.png';
  },

  _hideElement(element) {
    element.textContent = '';
    element.style.display = 'none';
  }
};

export {cardsGenerator};
