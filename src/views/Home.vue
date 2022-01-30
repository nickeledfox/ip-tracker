<template lang="pug">
header.header
  h1.header__title IP Address Tracker
  form.SearchForm(action="#" @submit.prevent)
    input.SearchForm__input(
      type="text",
      placeholder="Search for any IP address or domain",
      name="search",
      tabindex="0",
      v-model="queryIP"
    )
    button.SearchForm__btn(type="submit", @click="getIpData")
      img(src="../assets/icons/icon-arrow.svg")

  ResultsForm(v-if="IP" :IP="IP")
Map
</template>

<script>
import ResultsForm from '@/components/ResultsForm.vue';
import Map from '@/components/Map.vue';
import { LMap, LTileLayer, LMarker, LIcon } from 'leaflet';
import { ref, onMounted } from '@vue/runtime-core';
import axios from 'axios';
import 'dotenv/config';

export default {
  name: 'Home',
  components: {
    ResultsForm,
    Map,

    // leaflet components:
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
  },

  setup() {
    let map;
    const locationIcon = L.icon({
      iconUrl: require('/src/assets/icons/icon-location.svg'),
      iconSize: [40, 50],
      iconAnchor: [20, 30], // point of the icon which will correspond to marker's location
    });

    // Set attribution
    const customAttribution =
      'Coded by <a href="https://github.com/mia-7-7">mia-7-7</a>';

    // Map setup
    onMounted(() => {
      const MAPBOX = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}';
      const MAPBOX_TOKEN = process.env.VUE_APP_MAPBOX_TOKEN;
      // Initialize LeafletJS map
      map = L.map('map', { zoomControl: false }).setView(
        [34.052235, -118.243683],
        10
      );
      // Map customization
      L.tileLayer(`${MAPBOX}?access_token={accessToken}`, {
        attribution: customAttribution,
        minZoom: 3,
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: MAPBOX_TOKEN,
      }).addTo(map);
    });

    // Query setup
    const queryIP = ref('');
    let IP = ref('');
    const ArcGIS = process.env.VUE_APP_ARCGIS_API_KEY; // Address
    const KEY = process.env.VUE_APP_GEOLOCATION_API_KEY; // IP location
    const GEOLOCATION = 'https://geo.ipify.org/api/v2/country,city';

    const getIpData = async () => {
      try {
        const IPdata = await axios.get(
          `${GEOLOCATION}?apiKey=${KEY}&ipAddress=${queryIP.value}`
        );
        const searchResult = IPdata.data;
        IP.value = {
          address: searchResult.ip,
          city: searchResult.location.city,
          state: searchResult.location.region,
          zip: searchResult.location.postalCode,
          timezone: searchResult.location.timezone,
          isp: searchResult.isp,
          lat: searchResult.location.lat,
          lng: searchResult.location.lng,
        };
        // set marker to located IP
        L.marker([IP.value.lat, IP.value.lng], {
          icon: locationIcon,
        })
          .bindPopup('Popup') // add popup to the marker
          .addTo(map, map.setView([IP.value.lat, IP.value.lng], 13))
          .openPopup();
      } catch (err) {
        alert(err.message);
      }
    };
    return { queryIP, IP, getIpData };
  },

  // mounted() {
  //   const valueIsDomain = (val) => {
  //     const regex = /^[a-z0-9-]+\.[a-z0-9-]+(\.[a-z0-9-]+){0,2}$/i;
  //     return val.match(regex) && val.match(regex).length;
  //   };
  //   if (this.queryIP == '') {
  //     this.getIpData();
  //   }
  //   else if (this.queryIP == valueIsDomain) {
  //     this.getIpData(valueIsDomain);
  //   }
  // },
};
</script>

//*************************** Style ***********************************

<style lang="scss">
@use '../assets/styles/global' as *;

// search-form style
.SearchForm {
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: stretch;
  margin-bottom: 3rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  &__input {
    padding: 1rem 2rem;
    border: none;
    border-radius: $border-radius 0 0 $border-radius !important;
    font-size: 2rem;
    width: 70vw;
    max-width: 450px;
    transition: color linear 0.3s;
    caret-color: #4d4d4d7e;
  }
  &__btn {
    background: #000;
    padding: 1.5rem 2.5rem;
    border-radius: 0 $border-radius $border-radius 0;
    cursor: pointer;

    @media (any-hover: hover) {
      &:hover {
        background: #4d4d4d;
      }
    }
  }
}
</style>
