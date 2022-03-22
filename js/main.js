import {cardsGenerator} from './card.js';
const map = document.querySelector('#map-canvas');

map.appendChild(cardsGenerator.createCards().children[0]);
