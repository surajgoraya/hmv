<template>
  <div id="app">
    <VacciCount/>
    <CustomFooter/>
  </div>
</template>

<script>
import VacciCount from './components/VacciCount';
import CustomFooter from './components/CustomFooter';

export default {
  name: 'App',
  components: {
    VacciCount,
    CustomFooter
  }
}
</script>

<style>
h1{
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
<<<<<<< Updated upstream
  color: #fff;
  margin: 0;
  padding: 0;
=======
  height: 100%;
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
>>>>>>> Stashed changes
  height: 100%;
  background: #2c3e50;
}
<<<<<<< Updated upstream
body, html{
  height: 100%;
  widows: 100%;
  margin: 0;
=======

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

  #nav {
    a {
      color: $light;
    }
    background-color: $dark-2;
  }
>>>>>>> Stashed changes
}
</style>
