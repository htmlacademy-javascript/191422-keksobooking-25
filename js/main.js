import {util} from './util.js';
import {page} from './page.js';
import {cardsGenerator} from './card.js';
import {getData} from './api.js';
import {form} from './form.js';
import {Map} from './map.js';
import {filter} from './filter.js';

page.setInactive();

const init = async () => {
  const map = new Map('map-canvas');

  const getOffers = async () => await getData((data) => data, util.showAlert);
  const dataOffers = await getOffers();

  const createPopup = (offer) => {
    const popup = {};
    popup.card = cardsGenerator.createSingleCard(offer);
    popup.location = offer.location;

    return popup;
  };

  const addOfferToMap = (offers) => {
    const popups = offers.slice(0, 10).map(createPopup);
    map.addOfferMarkers(popups);
  };

  const activationPage = () => {
    if (dataOffers) {
      addOfferToMap(dataOffers);
      filter.init();
    }
    form.setAddress(map.getCurrentPosition());
    form.init();
    page.setActive();
  };

  const resetPage = () => {
    form.reset();
    map.reset();
    if (dataOffers) {
      filter.reset();
      map.removeOfferMarkers();
      addOfferToMap(dataOffers);
    }
    form.setAddress(map.getCurrentPosition());
  };

  const applyFilter = () => {
    const result = filter.check(dataOffers);
    map.removeOfferMarkers();
    if (result.length > 0) {
      addOfferToMap(result);
    } else {
      util.showAlert('По запросу ничего не найдено, измените настройки фильтра');
    }
  };

  map.onLoad(activationPage);
  form.onResetRequest(resetPage);
  form.onSubmit(resetPage);
  map.onSelectPosition(() => {
    form.setAddress(map.getCurrentPosition());
  });
  map.render();
  filter.onChange(util.debounce(applyFilter, 500));
};

if (document.readyState === 'interactive' || document.readyState === 'complete') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
