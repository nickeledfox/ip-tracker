import { LMap, LTileLayer, LMarker, LIcon } from 'leaflet';
import 'dotenv/config';

let map;
const locationIcon = L.icon({
  iconUrl: require('/src/assets/icons/icon-location.svg'),
  iconSize: [40, 50],
  iconAnchor: [20, 30], // point of the icon which will correspond to marker's location
});

// Popup on the map on click
// TODO: display addrrss.
const showOnClick = () => {
  const popup = L.popup();
  const onMapClick = (e) => {
    popup
      .setLatLng(e.latlng)
      .setContent('You clicked the map at ' + e.latlng.toString())
      .openOn(map);
  };
  map.on('click', onMapClick);
};

const initMap = () => {
  const URL = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}';
  const TOKEN = process.env.VUE_APP_MAPBOX_TOKEN;
  // Initialize LeafletJS map
  map = L.map('map', { zoomControl: false }).setView(
    [37.773972, -122.431297],
    10
  );
  // Map customization
  L.tileLayer(`${URL}?access_token={accessToken}`, {
    attribution: false,
    minZoom: 3,
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: TOKEN,
  }).addTo(map);

  showOnClick();
};

export default initMap;
