import {util} from './util.js';
import {page} from './page.js';
import {getData} from './api.js';
import './form.js';
import {Map} from './map.js';

page.setInactive();

const init = () => {
  const map = new Map('map-canvas');
  getData((offers) => map.addOfferMarkers(offers.slice(0, 10)), util.showAlert);

  // const buttonReset = document.querySelector('button[type="reset"]');
  // buttonReset.addEventListener('click', (evt) => {
  //   evt.preventDefault();
  //   map.resetMap();
  // });
};

if (document.readyState === 'interactive' || document.readyState === 'complete') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
