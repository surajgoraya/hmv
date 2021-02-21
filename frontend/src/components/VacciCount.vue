<template>
  <div class="vacc-count">
      <div class="vacc-count__centerDisplay">
        <h1 class="vacc-count__main">{{total}}</h1>
        <p class="vacc-count__caption">Last Updated:</p>
        <h3 class="vacc-count__date"> {{lastUpdated}}</h3>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import {ENDPOINTS} from '../config/consts';

export default {
  name: 'VacciCount',
  data(){
    return{
      total: null,
      lastUpdated: null
    }
  },
  
  async mounted(){
    const apiResp = await axios.get(ENDPOINTS.C19_TOTAL, {headers: {'Content-Type': 'application/json'}});
    if(apiResp.status === 200){
      const data = apiResp.data;
      this.lastUpdated = new Intl.DateTimeFormat('en-CA', {dateStyle: 'full', timeStyle: 'short'}).format(new Date(data.version));
      this.total = new Intl.NumberFormat('en-CA').format(Number.parseInt(data.total_vaccinations));
    } else {
      //return error?
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .vacc-count{
    margin: 0;
    padding: 0;
    display: flex;
    width: 100%;
    height: 100%;  
    align-items: center;
    justify-content: center;
  }
  .vacc-count__centerDisplay{
    flex-direction: column;
    display: flex;
  }
  .vacc-count__caption{
    margin: 1rem 0 .5rem 0;
    font-weight: 100;
    opacity: 0.6;
    font-size: .8rem;
  }
  .vacc-count__main{
    font-size: 3rem;
  }
  .vacc-count__date{
    margin: 0;
    font-weight: 300;
  }
</style>
