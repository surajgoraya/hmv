<template>
  <div id="app">
    <div id="nav">
      <h3 id="nav__brand">💉🍁 HowManyVaccines?</h3>
      <router-link to="/">Dashboard</router-link>
    </div>
    <router-view />
    <ColouredFooter
      :madeBy="true"
      :copyright="'suraj goraya'"
      :copyrightLink="'https://surajgoraya.ca'"
      :dataAck="'Covid19Tracker.ca'"
      :dataAckLink="'https://covid19tracker.ca/'"
    />
  </div>
</template>
<script>
import ColouredFooter from "./components/ColouredFooter.vue";
import store from "./store/store.js";
import { getVaccineData, getAbout } from "./api/api";

export default {
  components: {
    ColouredFooter,
  },
  methods: {
    async getData() {
      store.data = await getVaccineData();
      store.ghAbout = await getAbout();
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style lang="scss">
@import "./styles/_variables.scss";

.container {
  margin: 1rem 1rem 1rem 1rem;
}
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  display: flex;
  flex-direction: column;
}

html {
  width: 100%;
  height: 100%;
  margin: 0;
}

body {
  background-color: $light;
  color: #222;
  margin: 0;
  height: 100%;
  overflow: hidden;
}
a {
  font-weight: 300;
  text-decoration: none;
  color: $accent;
  opacity: 1;
  &:hover {
    transition: opacity cubic-bezier(0.075, 0.82, 0.165, 1) 500ms;
    opacity: 0.7;
  }
  &__active {
    font-weight: 500;
  }
}

a {
  font-weight: 300;
  text-decoration: none;
  color: $accent;
  opacity: 1;
  &:hover {
    transition: opacity cubic-bezier(0.075, 0.82, 0.165, 1) 500ms;
    opacity: 0.7;
  }
  &__active {
    font-weight: 500;
  }
}

#nav {
  position: sticky;
  top: 0;
  margin: 0;
  padding: 1rem;
  background-color: $light-2;
  display: flex;
  flex: 0;
  padding: 1rem;
  background-color: $light-2;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  &__brand {
    margin: 0;
    padding: none;
  }
  a {
    text-transform: lowercase;
    color: $dark;
    &:not(:nth-child(1)) {
      margin-left: 0.75rem;
    }
    &.router-link-exact-active {
      color: $accent;
    }
  }
}

.active,
.highlight {
  color: $accent;
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: $dark;
    color: #bdbdbd;
  }
}
#nav {
  a {
    color: $light;
  }
  background-color: $dark-2;
}
</style>
