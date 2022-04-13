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

  _compareSelectValue(select, offerValue) {
    return select.value === 'any' || select.value === offerValue.toString();
  },

  _comparePrice(priceValue) {
    if(fieldPrice.value === 'any') {
      return true;
    }

    const minPrice = PRICE_RANGE[fieldPrice.value][0];
    const maxPrice = PRICE_RANGE[fieldPrice.value][1];

    return minPrice <= priceValue && maxPrice >= priceValue;
  },

  _getSelectedFeatures() {
    const features = [];

    fieldFeatures.forEach((checkbox) => {
      if(checkbox.checked) {
        features.push(checkbox.value);
      }
    });

    return features;
  },

  _isOfferIncludesSelectedFeatures(markedFeatures, offerFeatures) {
    if(markedFeatures.length === 0) {
      return true;
    }

    if(!offerFeatures) {
      return false;
    }

    return markedFeatures.every((feature) => offerFeatures.includes(feature));
  },

  onChange(cb) {
    this._onfilterCallback.push(cb);
  },

  check(dataOffers) {
    const markedFeatures = this._getSelectedFeatures();

    return dataOffers.filter((dataOffer) =>
      this._compareSelectValue(fieldType, dataOffer.offer.type)
      && this._compareSelectValue(fieldRooms, dataOffer.offer.rooms)
      && this._compareSelectValue(fieldGuests, dataOffer.offer.guests)
      && this._comparePrice(dataOffer.offer.price)
      && this._isOfferIncludesSelectedFeatures(markedFeatures, dataOffer.offer.features));
  }
};

export {filter};
