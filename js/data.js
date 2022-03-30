import {util} from './util.js';

const OFFER_TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};

const CHECK_IN_OUT_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const LOCATION_LAT = {
  min: 35.65000,
  max: 35.70000
};

const LOCATION_LNG = {
  min: 139.70000,
  max: 139.80000
};

const createOfferObject = (index) => {
  index = index + 1 < 10 ? `0${index + 1}` : index + 1;

  const location = {
    lat: util.getRandomNumberFloat(LOCATION_LAT.min, LOCATION_LAT.max, 5),
    lng: util.getRandomNumberFloat(LOCATION_LNG.min, LOCATION_LNG.max, 5)
  };

  return {
    author: {
      avatar: `img/avatars/user${index}.png`,
    },
    offer: {
      title: 'Уютное гнездышко для молодоженов',
      address: `${location.lat}, ${location.lng}`,
      price: util.getRandomNumberInteger(500, 100000),
      type: util.getRandomArrayElement(Object.keys(OFFER_TYPES)),
      rooms: util.getRandomNumberInteger(1, 5),
      guests: util.getRandomNumberInteger(1, 10),
      checkin: util.getRandomArrayElement(CHECK_IN_OUT_TIMES),
      checkout: util.getRandomArrayElement(CHECK_IN_OUT_TIMES),
      features: FEATURES.slice(0, util.getRandomNumberInteger(1, FEATURES.length - 1)),
      description: 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
      photos: PHOTOS.slice(0, util.getRandomNumberInteger(1, PHOTOS.length - 1))
    },
    location
  };
};

const createOffers = () => Array.from({length: 10}, (currentValue, index) => createOfferObject(index));

export {createOffers, OFFER_TYPES};
