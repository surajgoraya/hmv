<template>
  <div class="numberDisplay">
    <p class="numberDisplay__title">{{ title }}</p>
    <h1 class="numberDisplay__number">
      {{ new Intl.NumberFormat("en-CA").format(number) }}
    </h1>
  </div>
</template>

<script>
export default {
  name: "NumberDisplay",
  props: {
    title: String,
    number: Number,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../styles/_variables.scss";
.numberDisplay {
  color: $light;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  &__title {
    opacity: 0.7;
    margin: 0;
  }
  &__number {
    margin: 0.2rem 0rem 0rem 0rem;
  }
}
</style>
