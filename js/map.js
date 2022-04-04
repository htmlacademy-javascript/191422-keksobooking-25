import {page} from './page.js';
import {cardsGenerator} from './card.js';

const fieldAddress = document.querySelector('#address');

const CENTER_MAP = {
  lat: 35.66322,
  lng: 139.77938
};

class Map {
  constructor(canvasSelector, offers) {
    this._map = this._createMap(canvasSelector);
    this._setTileLayers();
    this._addMainMarker();
    this._addOfferMarkers(offers);
  }

  _createMap(canvasSelector) {
    const onLoadMap = () => {
      page.setActive();
      fieldAddress.value = `${CENTER_MAP.lat}, ${CENTER_MAP.lng}`;
    };
    return L.map(canvasSelector).on('load', onLoadMap).setView(CENTER_MAP, 12);
  }

  _setTileLayers() {
    const layersURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const options = {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    };
    L.tileLayer(layersURL, options).addTo(this._map);
  }

  _addMainMarker() {
    const mainPinIcon = L.icon({
      iconUrl: './img/main-pin.svg',
      iconSize: [52, 52],
      iconAnchor: [26, 52]
    });

    const mainPinMarker = L.marker(
      CENTER_MAP, {
        draggable: true,
        icon: mainPinIcon
      },
    );

    mainPinMarker.addTo(this._map);

    mainPinMarker.on('moveend', (evt) => {
      const location = evt.target.getLatLng();
      fieldAddress.value = `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`;
    });
  }

  _addOfferMarkers(offers) {
    const markerGroup = L.layerGroup().addTo(this._map);

    const offerPinIcon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    });

    const createMarker = (offer) => {
      const marker = L.marker(
        offer.location,
        {offerPinIcon},
      );

      marker.addTo(markerGroup).bindPopup(cardsGenerator.createSingleCard(offer));
    };

    offers.forEach((offer) => {
      createMarker(offer);
    });
  }
}

export {Map};
