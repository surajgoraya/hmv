<template>
  <div class="vaccine-chart">
    <line-chart :chart-data="datacollection"></line-chart>
  </div>
</template>

<script>
import axios from "axios";
import LineChart from "./LineChart.js";
import { ENDPOINTS } from "../config/consts";

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      datacollection: null,
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    compareData(vaccinated, distributed) {
      let data1 = vaccinated.data.dataset.map((d) => d.total);
      let data2 = distributed.data.dataset.map((d) => d.total);
      let total = [];
      data1.forEach((vaccinated, i) => {
        total.push(vaccinated / data2[i]);
      });
      return total;
    },

    async fillData() {
      const distributed = await axios.get(ENDPOINTS.D_GRAPH);
      const vaccinated = await axios.get(ENDPOINTS.V_GRAPH);

      if (
        distributed &&
        distributed.status === 200 &&
        vaccinated &&
        vaccinated.status === 200
      ) {
        this.datacollection = {
          labels: distributed.data.dataset.map((d) =>
            new Intl.DateTimeFormat("en-CA", {
              dateStyle: "short",
            }).format(new Date(d.date))
          ),
          datasets: [
            {
              label: "Vaccines Distributed",
              backgroundColor: "#63809d",
              data: distributed.data.dataset.map((d) => d.total),
            },
            {
              label: "Completed Vaccinations",
              backgroundColor: "#202e3c",
              data: vaccinated.data.dataset.map((d) => d.total),
            },
          ],
        };
      } else {
        return null;
      }
    },
  },
};
</script>

<style>
.vaccine-chart {
  margin: 0;
}
</style>
