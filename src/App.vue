<template lang="pug">
header.header
  h1.header__title IP Address Tracker
  form.SearchForm(action="#")
    input.SearchForm__input(
      type="text",
      placeholder="Search for any IP address or domain",
      name="search",
      tabindex="0",
      v-model="queryIP"
    )
    button.SearchForm__btn(type="submit", @click.prevent="ValidateInput")
      img(src="./assets/icons/icon-arrow.svg")

  ResultsForm(v-if="IP" :IP="IP")
Map
</template>

<script>
import ResultsForm from '@/components/ResultsForm.vue';
import Map from '@/components/Map.vue';
import MapInit from './modules/map';

import { ref, onMounted } from '@vue/runtime-core';
import axios from 'axios';
import 'dotenv/config';

export default {
  name: 'Home',
  components: {
    ResultsForm,
    Map,
  },

  setup() {
    const map = new MapInit();

    onMounted(() => {
      map.displayMap();
      getIpData();
    });

    const ValidateInput = () => {
      const ipAddressRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
      const domainRegex =
        /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/;
      if (domainRegex.test(queryIP.value)) {
        getIpData();
        return true;
      } else if (ipAddressRegex.test(queryIP.value)) {
        getIpData();
        return true;
      }
      alert('You have entered an invalid IP address!');
      queryIP.value = '';
      return false;
    };

    // Query setup
    const queryIP = ref('');
    let IP = ref('');

    const getIpData = async () => {
      // TODO: Implement address. Current: import ersi Geocode problem
      const ArcGIS = process.env.VUE_APP_ARCGIS_API_KEY; // Address
      const KEY = process.env.VUE_APP_GEOLOCATION_API_KEY; // IP location
      const GEOLOCATION = 'https://geo.ipify.org/api/v2/country,city';
      try {
        const IPdata = await axios.get(
          `${GEOLOCATION}?apiKey=${KEY}&ipAddress=${queryIP.value}`
        );
        const result = IPdata.data;
        IP.value = {
          address: result.ip,
          city: result.location.city + ',',
          state: result.location.region,
          zip: result.location.postalCode,
          timezone: result.location.timezone,
          isp: result.isp,
        };

        // set marker to located IP
        if (queryIP.value == '') {
          map.setView(result.location.lat, result.location.lng);
        }
        if (queryIP.value) {
          map.flyTo(result.location.lat, result.location.lng);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    return { queryIP, IP, getIpData, ValidateInput };
  },
};
</script>

//*************************** Style ***********************************

<style lang="scss">
@use './assets/styles/global' as *;

.header {
  @include flex-vertical;
  position: relative;
  background-image: url('./assets/images/pattern-bg.png');
  background-position: center;
  background-size: cover;
  height: 30vh;
  padding-top: 0.5rem;

  &__title {
    color: #fff;
    padding-bottom: 1rem;
    letter-spacing: 0.7px;
  }
}

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
