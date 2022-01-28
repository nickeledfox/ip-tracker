<template lang="pug">
#map
</template>

<script>
import leaflet from 'leaflet';
import { onMounted } from '@vue/runtime-core';
import 'dotenv/config';

export default {
  name: 'Map',
  setup() {
    onMounted(() => {
      const map = L.map('map').setView([51.505, -0.09], 13);

      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
        {
          attribution:
            'Coded by <a href="https://github.com/mia-7-7">mia-7-7</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: process.env.VUE_APP_MAPBOX_TOKEN,
        }
      ).addTo(map);
    });
  },
};
</script>

<style scoped lang="scss">
#map {
  height: 70vh;
  width: 100vw;
  padding: 0;
  z-index: 1;
}
</style>
