import {util} from './util.js';
import {page} from './page.js';
import {cardsGenerator} from './card.js';
import {getData} from './api.js';
import {form} from './form.js';
import {Map} from './map.js';

page.setInactive();

const init = () => {
  const map = new Map('map-canvas');

  const addOfferMap = () => {
    const createPopup = (offer) => {
      const popup = {};
      popup.card = cardsGenerator.createSingleCard(offer);
      popup.location = offer.location;

      return popup;
    };

    const onLoadedOffers = (data) => {
      const popups = data.slice(0, 10).map(createPopup);
      map.addOfferMarkers(popups);
    };

    getData(onLoadedOffers, util.showAlert);
  };

  const activationPage = () => {
    addOfferMap();
    page.setActive();
    form.setAddress(map.getCurrentPosition());
    form.init();
  };

  const resetPage = () => {
    form.reset();
    map.reset();
    form.setAddress(map.getCurrentPosition());
  };

  map.onLoad(activationPage);
  form.onResetRequest(resetPage);
  form.onSubmit(resetPage);

  map.onSelectPosition(() => {
    form.setAddress(map.getCurrentPosition());
  });
};

if (document.readyState === 'interactive' || document.readyState === 'complete') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
