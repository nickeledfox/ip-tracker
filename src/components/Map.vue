<template lang="pug">
#map
</template>

<script>
import '/node_modules/leaflet/dist/leaflet.css';

export default {
  name: 'Map',
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
