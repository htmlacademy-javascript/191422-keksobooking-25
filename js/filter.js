const filterForm = document.querySelector('.map__filters');
const fieldType = filterForm.querySelector('#housing-type');
const fieldPrice = filterForm.querySelector('#housing-price');
const fieldRooms = filterForm.querySelector('#housing-rooms');
const fieldGuests = filterForm.querySelector('#housing-guests');
const fieldFeatures = filterForm.querySelectorAll('[name="features"]');

const PRICE_RANGE = {
  low: [0, 10000],
  middle: [10000, 50000],
  high: [50000, 100000]
};

const compareSelectValue = (select, offerValue) => select.value === 'any' || select.value === offerValue.toLowerCase();

const comparePrice = (priceValue) => {
  if(fieldPrice.value === 'any') {
    return true;
  }

  const minPrice = PRICE_RANGE[fieldPrice.value][0];
  const maxPrice = PRICE_RANGE[fieldPrice.value][1];

  return minPrice <= priceValue && maxPrice >= priceValue;
};

const getFieldFeatureValue = () => {
  const features = [];
  fieldFeatures.forEach((checkbox) => {
    if(checkbox.checked) {
      features.push(checkbox.value);
    }
  });
  return features;
};

const compareFeature = (offerFeatures, markedFeatures) => {
  if(markedFeatures.length === 0) {
    return true;
  }

  if(!offerFeatures) {
    return false;
  }

  const result = offerFeatures.filter((feature) => !(markedFeatures.indexOf(feature) > -1));
  return result.length === 0 && offerFeatures.length >= markedFeatures.length;
};

const filter = {
  _onfilterCallback: [],

  init() {
    filterForm.addEventListener('change', () => {
      this._onChangeFilter();
    });
  },

  _onChangeFilter() {
    this._onfilterCallback.forEach((cb) => cb());
  },

  onChange(cb) {
    this._onfilterCallback.push(cb);
  },

  check(dataOffers) {
    const markedFeatures = getFieldFeatureValue();

    return dataOffers.filter((dataOffer) =>
      compareSelectValue(fieldType, dataOffer.offer.type) &&
      compareSelectValue(fieldRooms, dataOffer.offer.rooms) &&
      compareSelectValue(fieldGuests, dataOffer.offer.guests) &&
      comparePrice(dataOffer.offer.price) &&
      compareFeature(dataOffer.offer.features, markedFeatures));
  }
};

export {filter};
