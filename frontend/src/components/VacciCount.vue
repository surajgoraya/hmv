<template>
  <div class="vacc-count">
    <div class="vacc-count__centerDisplay">
      <transition name="drop-in">
        <div
          class="vacc-count__top vacc-count__top--chart"
          v-if="graph"
          v-on:click="graph = !graph"
        >
          <VaccineChart />
        </div>
      </transition>
      <transition name="fade">
        <div
          class="vacc-count__top vacc-count__top--number"
          v-if="!graph"
          v-on:click="graph = !graph"
        >
          <p class="vacc-count__caption">Vaccines Distributed (thus far):</p>
          <h1 class="vacc-count__main">
            {{ total
            }}<small class="vacc-count__additonal" v-if="additonalDist > 0"
              >({{
                additonalDist > 0
                  ? "+" +
                    new Intl.NumberFormat("en-CA").format(
                      Number.parseInt(additonalDist)
                    )
                  : "-" +
                    new Intl.NumberFormat("en-CA").format(
                      Number.parseInt(additonalDist)
                    )
              }})</small
            >
          </h1>
          <p class="vacc-count__caption">Vaccinations Completed (thus far):</p>
          <h1 class="vacc-count__main">
            {{ completed
            }}<small class="vacc-count__additonal" v-if="additonalComp > 0"
              >({{
                additonalComp > 0
                  ? "+" +
                    new Intl.NumberFormat("en-CA").format(
                      Number.parseInt(additonalComp)
                    )
                  : "-" +
                    new Intl.NumberFormat("en-CA").format(
                      Number.parseInt(additonalComp)
                    )
              }})</small
            >
          </h1>
        </div>
      </transition>
      <div class="vacc-count__sub">
        <p class="vacc-count__caption">Last Updated:</p>
        <h3 class="vacc-count__date">{{ lastUpdated }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VaccineChart from "./VaccineChart";
import { ENDPOINTS } from "../config/consts";

export default {
  name: "VacciCount",
  components: {
    VaccineChart,
  },
  data() {
    return {
      total: null,
      additonalDist: null,
      additonalComp: null,
      completed: null,
      lastUpdated: null,
      graph: false,
    };
  },
  methods: {
    switchToGraph: function () {
      console.log("tapped");
    },
  },
  async mounted() {
    const apiResp = await axios.get(ENDPOINTS.C19_TOTAL, {
      headers: { "Content-Type": "application/json" },
    });
    if (apiResp.status === 200) {
      const data = apiResp.data;
      this.lastUpdated = new Intl.DateTimeFormat("en-CA", {
        dateStyle: "full",
        timeStyle: "short",
      }).format(new Date(data.version));
      this.total = new Intl.NumberFormat("en-CA").format(
        Number.parseInt(data.total_vaccines_distributed)
      );
      this.completed = new Intl.NumberFormat("en-CA").format(
        Number.parseInt(data.total_vaccinated)
      );
      this.additonalDist = data.change_vaccines_distributed;
      this.additonalComp = data.change_vaccinated;
    } else {
      //return error?
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vacc-count {
  margin: 0;
  padding: 0;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}
.vacc-count__centerDisplay {
  flex-direction: column;
  display: flex;
}
.vacc-count__additonal {
  margin-left: 0.5rem;
  font-size: 1.5rem;
}
.vacc-count__caption {
  margin: 1rem 0 0.5rem 0;
  font-weight: 100;
  opacity: 0.6;
  font-size: 0.8rem;
}
.vacc-count__top {
  cursor: pointer;
}

.vacc-count__main {
  font-size: 3rem;
}
.vacc-count__sub {
  margin-top: 1rem;
  opacity: 0.5;
}
.vacc-count__date {
  margin: 0;
  font-weight: 300;
  font-size: 0.9rem;
}
.fade-enter-active,
.fade-enter-leave {
  transition: opacity cubic-bezier(0.075, 0.82, 0.165, 1) 1000ms,
    transform cubic-bezier(0.075, 0.82, 0.165, 1) 1000ms;
}
.fade-enter,
.fade-leave {
  opacity: 0;
  transform: translateY(-2rem);
}
.drop-in-enter-active {
  transition: opacity cubic-bezier(0.075, 0.82, 0.165, 1) 1000ms,
    transform cubic-bezier(0.075, 0.82, 0.165, 1) 1200ms;
}
.drop-in-enter {
  opacity: 0;
  transform: translateY(-2rem);
}
</style>
