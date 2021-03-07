<template>
  <div class="dash container">
    <div class="dash__numbers">
      <NumberDisplay
        :title="'Total doeses delivered (thus far):'"
        :number="total_vaccines_distributed"
      />
      <NumberDisplay
        :title="'Total doses administered (thus far):'"
        :number="total_vaccinations"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NumberDisplay from "@/components/NumberDisplay.vue";
import store, { getData } from "../store/store.js";
export default {
  name: "Home",
  components: {
    NumberDisplay,
  },
  computed: {
    total_vaccinations() {
      if (store.data.total_vaccinations) {
        return store.data.total_vaccinations;
      } else {
        return null;
      }
    },
    total_vaccines_distributed() {
      if (store.data.total_vaccines_distributed) {
        return store.data.total_vaccines_distributed;
      } else {
        return null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dash {
  height: 90%;
  display: flex;
  flex-direction: column;
  text-align: left;
  align-items: center;
  justify-content: center;
  &__numbers > * {
    &:not(:first-child) {
      margin-top: 1rem;
    }
  }
}
</style>