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
