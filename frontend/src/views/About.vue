<template>
  <div class="about__main">
    <div class="about container" v-html="compiledMarkdown"></div>
    <p class="about__version container">
      api version 0.0.1 / application version 0.2.0
    </p>
  </div>
</template>
<script>
import store from "../store/store.js";

export default {
  computed: {
    compiledMarkdown() {
      return store.ghAbout;
    },
  },
};
</script>
<style lang="scss" scoped>
hr {
  margin: 2rem;
  margin-bottom: 1rem;
  opacity: 0.7;
}
.about {
  height: auto;
  overflow: scroll;
  &__main {
    height: auto;
    overflow: scroll;
  }
  &__version {
    position: sticky;
    bottom: 3rem;
    margin-top: 0rem;
    opacity: 0.3;
  }
}
</style>