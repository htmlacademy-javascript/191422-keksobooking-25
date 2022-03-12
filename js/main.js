const getRandomNumberInteger = (a, b) => {
  const minNum = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const maxNum = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
};

const getRandomNumberFloat = (a, b, decimal = 1) => {
  const minNum = Math.min(Math.abs(a), Math.abs(b));
  const maxNum = Math.max(Math.abs(a), Math.abs(b));
  return parseFloat((Math.random() * (maxNum - minNum) + minNum).toFixed(decimal));
};

const getRandomArrayElement = (elements) => elements[getRandomNumberInteger(0, elements.length - 1)];

const AD_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const AD_TIME = [
  '12:00',
  '13:00',
  '14:00'
];

const AD_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const AD_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const AD_LOCATION_LAT = {
  min: 35.65000,
  max: 35.70000
};

const AD_LOCATION_LNG = {
  min: 139.70000,
  max: 139.80000
};

const createCardAd = (index) => {
  index = index + 1 < 10 ? `0${index + 1}` : index + 1;

  const location = {
    lat: getRandomNumberFloat(AD_LOCATION_LAT.min, AD_LOCATION_LAT.max, 5),
    lng: getRandomNumberFloat(AD_LOCATION_LNG.min, AD_LOCATION_LNG.max, 5)
  };

  return {
    author: {
      avatar: `img/avatars/user${index}.png`,
    },
    offer: {
      title: 'Уютное гнездышко для молодоженов',
      address: `${location.lat}, ${location.lng}`,
      price: getRandomNumberInteger(500, 100000),
      type: getRandomArrayElement(AD_TYPE),
      rooms: getRandomNumberInteger(1, 5),
      guests: getRandomNumberInteger(1, 10),
      checkin: getRandomArrayElement(AD_TIME),
      checkout: getRandomArrayElement(AD_TIME),
      features: AD_FEATURES.slice(0, getRandomNumberInteger(1, AD_FEATURES.length - 1)),
      description: 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
      photos: AD_PHOTOS.slice(0, getRandomNumberInteger(1, AD_PHOTOS.length - 1))
    },
    location
  };
};

const similarCardAds = Array.from({length: 10}, (currentValue, index) => createCardAd(index));

console.log(similarCardAds);
