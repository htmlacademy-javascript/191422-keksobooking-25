const CENTER_MAP = {
  lat: 35.66322,
  lng: 139.77938
};

class Map {
  constructor(canvasSelector) {
    this._map = this._createMap(canvasSelector);
    this._markerGroup = L.layerGroup().addTo(this._map);
    this._mainPinMarker = this._addMainMarker();
    this._setTileLayers();
  }

  _createMap(canvasSelector) {
    return L.map(canvasSelector);
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

    return mainPinMarker;
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
