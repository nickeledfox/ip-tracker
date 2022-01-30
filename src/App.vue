<template>
  <router-view />
</template>

<style lang="scss">
@use './assets/styles/global.scss' as *;

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
</style>
