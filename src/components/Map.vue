<template lang="pug">
#map
</template>

<script>
// import { LMap, LTileLayer, LMarker, LIcon } from 'leaflet';
import '/node_modules/leaflet/dist/leaflet.css';

import { onMounted } from '@vue/runtime-core';
import 'dotenv/config';

export default {
  name: 'Map',
  // setup() {
  //   let map;
  //   const locationIcon = L.icon({
  //     iconUrl: require('/src/assets/icons/icon-location.svg'),
  //     iconSize: [40, 50],
  //     iconAnchor: [20, 30], // point of the icon which will correspond to marker's location
  //   });
  //   // Set attribution
  //   const customAttribution =
  //     'Coded by <a href="https://github.com/mia-7-7">mia-7-7</a>';

  //   // Map setup
  //   onMounted(() => {
  //     const URL = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}';
  //     const TOKEN = process.env.VUE_APP_MAPBOX_TOKEN;
  //     // Initialize LeafletJS map
  //     map = L.map('map', { zoomControl: false }).setView(
  //       [34.052235, -118.243683],
  //       10
  //     );
  //     // Map customization
  //     L.tileLayer(`${URL}?access_token={accessToken}`, {
  //       attribution: customAttribution,
  //       minZoom: 3,
  //       maxZoom: 18,
  //       id: 'mapbox/streets-v11',
  //       tileSize: 512,
  //       zoomOffset: -1,
  //       accessToken: TOKEN,
  //     }).addTo(map);
  //   });
  // },
};
</script>

<style lang="scss">
@use '../assets/styles/global' as *;

#map {
  height: 70vh;
  width: 100vw;
  padding: 0;
  z-index: 1;
}

// leaflet popup
.leaflet-popup .leaflet-popup-content-wrapper {
  padding-right: 0.6rem;
  background-color: white;
  border-radius: $border-radius;
}
.leaflet-popup .leaflet-popup-content {
  font-size: 1.2rem;
  margin: 1.3rem 2rem;
}

.leaflet-popup .leaflet-popup-tip {
  background-color: green;
}

.leaflet-container a.leaflet-popup-close-button {
  color: green !important;
  opacity: 0.5;
}

.leaflet-container a.leaflet-popup-close-button:hover {
  opacity: 1;
}
</style>
