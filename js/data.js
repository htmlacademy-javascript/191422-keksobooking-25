import {getRandomNumberInteger, getRandomNumberFloat, getRandomArrayElement} from './util.js';

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const TIME = [
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

const createCardAd = (index) => {
  index = index + 1 < 10 ? `0${index + 1}` : index + 1;

  const location = {
    lat: getRandomNumberFloat(LOCATION_LAT.min, LOCATION_LAT.max, 5),
    lng: getRandomNumberFloat(LOCATION_LNG.min, LOCATION_LNG.max, 5)
  };

  return {
    author: {
      avatar: `img/avatars/user${index}.png`,
    },
    offer: {
      title: 'Уютное гнездышко для молодоженов',
      address: `${location.lat}, ${location.lng}`,
      price: getRandomNumberInteger(500, 100000),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomNumberInteger(1, 5),
      guests: getRandomNumberInteger(1, 10),
      checkin: getRandomArrayElement(TIME),
      checkout: getRandomArrayElement(TIME),
      features: FEATURES.slice(0, getRandomNumberInteger(1, FEATURES.length - 1)),
      description: 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
      photos: PHOTOS.slice(0, getRandomNumberInteger(1, PHOTOS.length - 1))
    },
    location
  };
};

const createCardAds = () => Array.from({length: 10}, (currentValue, index) => createCardAd(index));

export {createCardAds};
