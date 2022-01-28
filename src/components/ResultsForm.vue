<template lang="pug">
.ResultsForm__container
  .ResultsForm__item
    h4.ResultsForm__item__title IP Address
    p.ResultsForm__item__data {{IP.address}}

  .ResultsForm__item
    h4.ResultsForm__item__title Location
    p.ResultsForm__item__data {{IP.country + ','}} {{IP.state}}

  .ResultsForm__item
    h4.ResultsForm__item__title Timezone
    p.ResultsForm__item__data {{IP.timezone}} 

  .ResultsForm__item
    h4.ResultsForm__item__title Isp
    p.ResultsForm__item__data {{IP.isp}}
</template>

<script>
export default {
  name: 'ResultForm',
  props: ['IP'],
};
</script>

<style scoped lang="scss">
@use '../assets/styles/global' as *;
.ResultsForm__container {
  @include flex-vertical;
  padding: 1.5rem 0;
  background: #fff;
  border-radius: 12px;
  display: flex;
  justify-content: space-around;
  margin: 0 1rem;
  max-width: 95vw;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  z-index: 3;
  width: 70vw;

  @media (min-width: 992px) {
    max-width: 80vw;
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }
}
.ResultsForm__item {
  position: relative;
  flex: 1 1 0;
  min-width: 0;
  font-size: 2rem;
  text-align: center;

  @media (min-width: 768px) {
    padding: 1rem 5rem 1rem 3rem;
    text-align: left;
  }

  @media (min-width: 768px) {
    &:not(:first-child) {
      &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 20%;
        height: 70%;
        border-right: 1px solid;
        opacity: 0.2;
      }
    }
  }

  &__title {
    text-transform: uppercase;
    opacity: 0.6;
    font-weight: 900;
    font-size: 1.1rem;
    letter-spacing: 1px;
    margin: 0;
  }
  &__data {
    font-weight: 700;
    color: #000;

    @media (max-width: 768px) {
      margin: 1rem;
    }
  }
}
</style>
