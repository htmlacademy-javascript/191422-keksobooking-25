import {page} from './page.js';
import './form.js';
import {createOffers} from './data.js';
import {Map} from './map.js';

const init = () => {
  const offers = createOffers();
  new Map('map-canvas', offers);
};

page.setInactive();

if (document.readyState === 'interactive' || document.readyState === 'complete') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
