import * as leaflet from 'leaflet';
import 'dotenv/config';

export default class MapInit {
  constructor() {
    this.setupEvents();
  }

  setupEvents() {
    /* this.displayMap() */
  }

  createMap() {
    this.coords = [40.650002, -73.949997];
    this.map = leaflet.map('map', {
      center: this.coords,
      zoom: 10,
      zoomControl: false,
    });
  }

  createLayer() {
    const URL = 'https://api.mapbox.com';
    const STYLE = '/styles/v1/{id}/tiles/{z}/{x}/{y}';

    leaflet
      .tileLayer(`${URL}${STYLE}?access_token={token}`, {
        attribution: false,
        minZoom: 3,
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        token: process.env.VUE_APP_MAPBOX_TOKEN,
      })
      .addTo(this.map);
  }

  createIcon() {
    this.icon = leaflet.icon({
      iconUrl: require('/src/assets/icons/icon-location.svg'),
      iconSize: [46, 56],
    });
  }

  createMarker() {
    this.msg = 'We are here!';
    this.newMarker = leaflet
      .marker(this.coords, { icon: this.icon })
      .addTo(this.map)
      .bindPopup(this.msg);
  }

  displayMap() {
    this.createMap();
    this.createLayer();
    this.createIcon();
    this.createMarker();
  }

  setView(lat, lng) {
    this.map.setView([lat, lng], 14);

    this.newMarker = leaflet
      .marker([lat, lng], { icon: this.icon })
      .addTo(this.map)
      .bindPopup(this.msg);
  }

  flyTo(lat, lng) {
    this.map.flyTo([lat, lng], 14);
    this.map.removeLayer(this.newMarker);

    this.newMarker = leaflet
      .marker([lat, lng], { icon: this.icon })
      .addTo(this.map)
      .bindPopup(this.msg);
  }
}
