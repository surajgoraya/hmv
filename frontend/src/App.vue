<template>
  <div id="app">
    <VacciCount/>
    <Footer/>
  </div>
</template>

<script>
import VacciCount from './components/VacciCount';
import Footer from './components/Footer';

export default {
  name: 'App',
  components: {
    VacciCount,
    Footer
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
  color: #fff;
  margin: 0;
  padding: 0;
  height: 100%;
  background: #2c3e50;
}
body, html{
  height: 100%;
  widows: 100%;
  margin: 0;
}
</style>
