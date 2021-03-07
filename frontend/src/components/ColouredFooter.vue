<template>
  <div class="cFooter">
    <div class="cFooter__container">
      <div class="cFooter__left" v-if="!madeBy">
        &copy;
        <a :href="copyrightLink">{{ copyright }}</a>
        {{ new Date().getFullYear() }}
      </div>
      <div class="cFooter__left" v-if="madeBy">
        a project by
        <a :href="copyrightLink">{{ copyright }}</a>
      </div>
      <div class="cFooter__right">
        data provided by <a :href="dataAckLink">{{ dataAck }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ColouredFooter",
  props: {
    madeBy: Boolean,
    copyright: String,
    copyrightLink: String,
    dataAck: String,
    dataAckLink: String,
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/_variables.scss";
.cFooter {
  font-size: 0.9rem;
  position: sticky;
  bottom: 0;
  font-weight: 100;
  text-transform: lowercase;
  padding: 1rem 0rem 1rem 0rem;
  width: 100%;
  background-color: $light-2;
  &__container {
    margin: 0rem 1rem 0rem 1rem;
    display: flex;
    justify-content: space-between;
  }
}

@media (prefers-color-scheme: dark) {
  .cFooter {
    background-color: $dark-2;
  }
}
</style>
