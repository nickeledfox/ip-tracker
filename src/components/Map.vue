<template lang="pug">
#map
</template>

<script>
import '/node_modules/leaflet/dist/leaflet.css';

export default {
  name: 'Map',
};

// const getAddress = () => {
//   var map = L.map('map').setView([40.725, -73.985], 13);
//   var apiKey =
//     'AAPK82950f376e9a493fbf7deb98e5a2b4cdCEPdNyXi8cHifp_-itIYexQWWIFIqmrkCOdJHFNbyXDZDywOvRo63774YqJarogb';
//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution:
//       '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
//   }).addTo(map);

//   var geocodeService = L.esri.Geocoding.geocodeService({
//     apikey: apiKey, // replace with your api key - https://developers.arcgis.com
//   });

//   map.on('click', function (e) {
//     geocodeService
//       .reverse()
//       .latlng(e.latlng)
//       .run(function (error, result) {
//         if (error) {
//           return;
//         }

//         L.marker(result.latlng)
//           .addTo(map)
//           .bindPopup(result.address.Match_addr)
//           .openPopup();
//       });
//   });
// };
// getAddress();
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
