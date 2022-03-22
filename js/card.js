import {createOffers, OFFER_TYPES} from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const offersList = createOffers();

const cardsGenerator = {
  createCards() {
    const cardsFragment = document.createDocumentFragment();
    offersList.forEach((offer) => {
      cardsFragment.appendChild(this.createSingleCard(offer));
    });
    return cardsFragment;
  },
  createSingleCard(offer) {
    const card = cardTemplate.cloneNode(true);
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
    const title = card.querySelector('.popup__title');
    title.textContent = offer.title ? offer.title : 'Объявление';
  },
  setCardAddress(card, offer) {
    const address = card.querySelector('.popup__text--address');
    address.textContent = offer.address ? offer.address : 'Точный адрес не указан';
  },
  setCardPrice(card, offer) {
    const price = card.querySelector('.popup__text--price');
    price.innerHTML = offer.price ? `${offer.price} <span>₽/ночь</span>` : 'Цена не указана';
  },
  setCardType(card, offer) {
    const type = card.querySelector('.popup__type');

    if (offer.type) {
      type.textContent = OFFER_TYPES[offer.type];
    } else {
      type.textContent = '';
      type.style.display = 'none';
    }
  },
  setCardCapacity(card, offer) {
    const capacity = card.querySelector('.popup__text--capacity');
    const result = [];

    if (offer.rooms) {
      result.push(`${offer.rooms} комнаты`);
    }

    if (offer.guests) {
      result.push(`для ${offer.guests} гостей`);
    }

    capacity.textContent = result.join(' ');
  },
  setCardTime(card, offer) {
    const time = card.querySelector('.popup__text--time');
    const result = [];

    if (offer.checkin) {
      result.push(`Заезд после ${offer.checkin}`);
    }

    if (offer.checkout) {
      result.push(`выезд до ${offer.checkout}`);
    }

    time.textContent = result.join(', ');
  },
  setCardFeatures(card, offer) {
    const features = card.querySelector('.popup__features');
    const featuresList = features.querySelectorAll('.popup__feature');

    if (offer.features.length > 0) {
      const featuresmModifiers = offer.features.map((feature) => `popup__feature--${feature}`);
      featuresList.forEach((featureItem) => {
        const modifier = featureItem.classList[1];

        if (!featuresmModifiers.includes(modifier)) {
          featureItem.remove();
        }
      });
    } else {
      features.textContent = '';
      features.style.display = 'none';
    }
  },
  setCardDescription(card, offer) {
    const description = card.querySelector('.popup__description');

    if (offer.description) {
      description.textContent = offer.description;
    } else {
      description.textContent = '';
      description.style.display = 'none';
    }
  },
  setCardPhotos(card, offer) {
    const photos = card.querySelector('.popup__photos');
    const cardPhotosFragment = document.createDocumentFragment();
    const cardPhotoTemplate = cardTemplate.querySelector('.popup__photo');

    photos.textContent = '';

    offer.photos.forEach((photoSrc) => {
      const cardPhotoElement = cardPhotoTemplate.cloneNode(true);
      cardPhotoElement.src = photoSrc;
      cardPhotosFragment.appendChild(cardPhotoElement);
    });

    photos.appendChild(cardPhotosFragment);
  },
  setCardAvatar(card, author) {
    const avatar = card.querySelector('.popup__avatar');
    avatar.src = author.avatar ? author.avatar : 'img/avatars/default.png';
  }
};

export {cardsGenerator};
