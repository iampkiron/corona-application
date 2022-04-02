<template>
  <canvas width="400" height="400" ref="myChart"></canvas>
</template>

<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
export default {
  name: "chartGraph",
  data() {
    return {
      ChartObejct: null,
    };
  },
  props: {
    chartOptions: {
      type: Object,
      default() {
        return {
          type: "bar",
          labels: ["Red", "Blue"],
          datasets: [
            {
              label: "# of Votes",
              data: [12, 19],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        };
      },
    },
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      const { type, labels, datasets, options } = this.chartOptions;
      const ctx = this.$refs.myChart;
      this.ChartObject = new Chart(ctx, {
        type: type,
        data: {
          labels,
          datasets,
        },
        options,
      });
    },
  },
};
</script>

<style></style>
