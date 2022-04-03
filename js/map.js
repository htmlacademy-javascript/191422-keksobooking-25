import {page} from './page.js';
import {createOffers} from './data.js';
import {cardsGenerator} from './card.js';

const fieldAddress = document.querySelector('#address');
const offers = createOffers();

const CENTER_MAP = {
  lat: 35.66322,
  lng: 139.77938
};

const createMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      page.setActive();
      fieldAddress.value = `${CENTER_MAP.lat}, ${CENTER_MAP.lng}`;
    })
    .setView(CENTER_MAP, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
    }
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52]
  });

  const mainPinMarker = L.marker(
    CENTER_MAP,
    {
      draggable: true,
      icon: mainPinIcon
    },
  );

  const markerGroup = L.layerGroup().addTo(map);

  const offerPinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  });

  const createMarker = (offer) => {
    const {lat, lng} = offer.location;
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        offerPinIcon,
      },
    );

    marker.addTo(markerGroup).bindPopup(cardsGenerator.createSingleCard(offer));
  };

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    const location = evt.target.getLatLng();
    fieldAddress.value = `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`;
  });

  offers.forEach((offer) => {
    createMarker(offer);
  });
};

export {createMap};
