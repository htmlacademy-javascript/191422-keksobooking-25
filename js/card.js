import {createOffers, OFFER_TYPES} from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarOffers = createOffers();
const similarListFragment = document.createDocumentFragment();
const map = document.querySelector('#map-canvas');

similarOffers.forEach(({author, offer}) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').innerhtml = `${offer.price} <span>₽/ночь</span>`;
  cardElement.querySelector('.popup__type').textContent = OFFER_TYPES[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const featuresList = cardElement.querySelectorAll('.popup__feature');
  const featuresmModifiers = offer.features.map((feature) => `popup__feature--${feature}`);
  featuresList.forEach((featureItem) => {
    const modifier = featureItem.classList[1];

    if (!featuresmModifiers.includes(modifier)) {
      featureItem.remove();
    }
  });

  cardElement.querySelector('.popup__description').textContent = offer.description;

  cardElement.querySelector('.popup__photos').textContent = '';
  const cardPhotosFragment = document.createDocumentFragment();
  offer.photos.forEach((photoSrc) => {
    const cardPhotoElement = cardTemplate.querySelector('.popup__photo').cloneNode(true);
    cardPhotoElement.src = photoSrc;
    cardPhotosFragment.appendChild(cardPhotoElement);
  });
  cardElement.querySelector('.popup__photos').appendChild(cardPhotosFragment);

  cardElement.querySelector('.popup__avatar').src = author.avatar;

  similarListFragment.appendChild(cardElement);
});

map.appendChild(similarListFragment.children[0]);
