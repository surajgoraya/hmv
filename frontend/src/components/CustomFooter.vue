<template>
  <div class="footer">
    <p class="footer__attr">
      ‼️ <b>This is not a government site.</b> <i>Not even sort of.</i>
    </p>
    <p class="footer__attr">
      Made by <a href="https://surajgoraya.ca">Suraj Goraya</a>
      ⎹ Data generously provided by:
      <a href="http://covid19tracker.ca">covid19tracker.ca</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "customfooter",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
  background: #202e3c;
  margin: auto;
  width: 100vw;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0.5rem 0 0.5rem 0;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-evenly;
}
.footer__attr {
  opacity: 0.7;
  padding: 1rem;
  margin: 0;
}
.footer__attr > a {
  margin: 0;
  padding: 0rem;
  color: #63809d;
}
</style>
