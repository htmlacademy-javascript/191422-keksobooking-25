import {util} from './util.js';
import {page} from './page.js';
// import {cardsGenerator} from './card.js';
import {getData} from './api.js';
import {form} from './form.js';
import {Map} from './map.js';

page.setInactive();

const init = () => {
  const map = new Map('map-canvas');

  const mapLoad = () => {
    // getData((offers) => map.addOfferMarkers(offers.slice(0, 10), cardsGenerator.createSingleCard), util.showAlert);
    getData((offers) => map.addOfferMarkers(offers.slice(0, 10)), util.showAlert);
    page.setActive();
    form.setAddress(map.getCurrentPosition());
  };

  map.onLoad(mapLoad);

  const resetPage = () => {
    form.reset();
    map.reset();
    form.setAddress(map.getCurrentPosition());
  };

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
