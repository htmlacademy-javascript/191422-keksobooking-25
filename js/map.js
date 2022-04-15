const CENTER_MAP = {
  lat: 35.66322,
  lng: 139.77938
};

const COPYRIGHT_MAP = {
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  options: {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }
};

const PIN_ICON = {
  main: {
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52]
  },
  offer: {
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  }
};

class Map {
  constructor(canvasSelector) {
    this._map = this._create(canvasSelector);
    this._offerPinIcon = L.icon(PIN_ICON.offer);
    this._mainPinIcon = L.icon(PIN_ICON.main);
    this._mainPinMarker = L.marker(
      CENTER_MAP, {
        draggable: true,
        icon: this._mainPinIcon
      },
    );
    this._markerGroup = L.layerGroup().addTo(this._map);
    this._mainPinMarker = this._addMainMarker();
    this._setTileLayers();
  }

  _create(canvasSelector) {
    return L.map(canvasSelector);
  }

  _setTileLayers() {
    L.tileLayer(COPYRIGHT_MAP.url, COPYRIGHT_MAP.options).addTo(this._map);
  }

  _addMainMarker() {
    this._mainPinMarker.addTo(this._map);
    return this._mainPinMarker;
  }

  onLoad(cb) {
    this._map.on('load', () => cb());
  }

  onSelectPosition(cb) {
    this._mainPinMarker.on('moveend', () => cb());
  }

  getCurrentPosition() {
    return this._mainPinMarker.getLatLng();
  }

  addOfferMarkers(offers) {
    const createMarker = (offer) => {
      const marker = L.marker(offer.location, this._offerPinIcon);
      marker.addTo(this._markerGroup).bindPopup(offer.card);
    };

    offers.forEach((offer) => {
      createMarker(offer);
    });
  }

  removeOfferMarkers() {
    this._markerGroup.clearLayers();
  }

  render() {
    this._map.setView(CENTER_MAP, 12);
  }

  reset() {
    this._map.closePopup();
    this._map.setView(CENTER_MAP, 12);
    this._mainPinMarker.setLatLng(CENTER_MAP);
  }
}

export {Map};
