const filterFormNode = document.querySelector('.map__filters');
const fieldTypeNode = filterFormNode.querySelector('#housing-type');
const fieldPriceNode = filterFormNode.querySelector('#housing-price');
const fieldRoomsNode = filterFormNode.querySelector('#housing-rooms');
const fieldGuestsNode = filterFormNode.querySelector('#housing-guests');
const fieldFeaturesNode = filterFormNode.querySelectorAll('[name="features"]');

const PRICE_RANGE = {
  low: [0, 10000],
  middle: [10000, 50000],
  high: [50000, 100000]
};

const filter = {
  _onfilterCallback: [],

  init() {
    filterFormNode.addEventListener('change', () => {
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
    if(fieldPriceNode.value === 'any') {
      return true;
    }

    const minPrice = PRICE_RANGE[fieldPriceNode.value][0];
    const maxPrice = PRICE_RANGE[fieldPriceNode.value][1];

    return minPrice <= priceValue && maxPrice >= priceValue;
  },

  _getSelectedFeatures() {
    const features = [];

    fieldFeaturesNode.forEach((checkbox) => {
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
      this._compareSelectValue(fieldTypeNode, dataOffer.offer.type)
      && this._compareSelectValue(fieldRoomsNode, dataOffer.offer.rooms)
      && this._compareSelectValue(fieldGuestsNode, dataOffer.offer.guests)
      && this._comparePrice(dataOffer.offer.price)
      && this._isOfferIncludesSelectedFeatures(markedFeatures, dataOffer.offer.features));
  },

  reset() {
    filterFormNode.reset();
  }
};

export {filter};
