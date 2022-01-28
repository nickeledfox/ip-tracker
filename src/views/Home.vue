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
    button.SearchForm__btn(type="submit", @click="getIpData")
      img(src="../assets/icons/icon-arrow.svg")

  ResultsForm(:IP="IP")
Map
</template>

<script>
import ResultsForm from '@/components/ResultsForm.vue';
import Map from '@/components/Map.vue';

import { ref } from '@vue/runtime-core';
import axios from 'axios';
import 'dotenv/config';

export default {
  name: 'Home',
  components: {
    ResultsForm,
    Map,
  },
  props: ['IP', 'queryIP', 'getIpData'],
  setup() {
    const queryIP = ref('');
    let IP = ref('');
    const KEY = process.env.VUE_APP_GEOLOCATION_API_KEY;
    const GEOLOCATION = 'https://geo.ipify.org/api/v2/country';

    const getIpData = async () => {
      try {
        const IPdata = await axios.get(
          `${GEOLOCATION}?apiKey=${KEY}&ipAddress=${queryIP.value}`
        );
        const result = IPdata.data;
        IP.value = {
          address: result.ip,
          country: result.location.country,
          state: result.location.region,
          timezone: result.location.timezone,
          isp: result.isp,
          lat: result.location.lat,
          lng: result.location.lng,
        };
        console.log(result);
      } catch (err) {
        alert(err.message);
      }
    };
    return { queryIP, IP, getIpData };

    if (IP.value == '' && IP.value != null) {
      getIpData().load();
    }
  },
};
</script>

<style lang="scss">
@use '../assets/styles/global' as *;

.header {
  @include flex-vertical;
  position: relative;
  background-image: url('../assets/images/pattern-bg.png');
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
    border-radius: 12px 0 0 12px !important;
    font-size: 2rem;
    width: 70vw;
    max-width: 450px;
    transition: color linear 0.3s;
    caret-color: #4d4d4d7e;
  }
  &__btn {
    background: #000;
    padding: 1.5rem 2.5rem;
    border-radius: 0 12px 12px 0;
    cursor: pointer;

    @media (any-hover: hover) {
      &:hover {
        background: #4d4d4d;
      }
    }
  }
}
</style>
