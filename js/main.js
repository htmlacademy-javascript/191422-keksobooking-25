import {page} from './page.js';
import {createOffers} from './data.js';
import {cardsGenerator} from './card.js';
import './form.js';

page.setInactive();
page.setActive();

const map = document.querySelector('#map-canvas');
const offers = createOffers();
const offersCards = cardsGenerator.createCards(offers);

map.appendChild(offersCards.children[0]);
