<template>
  <div>
    <ul class="graph-list">
      <li>
        <h3>누적 확진/사망자 추이</h3>
        <ChartGraph :chartOptions="domesticCases" :key="caseKey" />
      </li>
      <li>
        <h3>확진자 대비 사망자</h3>
        <ChartGraph :chartOptions="domesticCompare" :key="compareKey" />
      </li>
    </ul>
  </div>
</template>

<script>
import moment from "moment";
import coronaMixin from "../../mixins/coronaMixin";
import ChartGraph from "../charts/ChartGraph.vue";
export default {
  name: "domesticCases",
  components: {
    ChartGraph,
  },
  mixins: [coronaMixin],
  data() {
    return {
      caseKey: 0,
      compareKey: 0,
      monthDifference: 4,
      domesticData: [],
    };
  },
  watch: {
    domesticCases: {
      handler() {
        this.caseKey++;
      },
      deep: true,
    },
    domesticCompare: {
      handler() {
        this.compareKey++;
      },
      deep: true,
    },
  },
  mounted() {
    this.fetchDomestic();
  },
  methods: {
    async fetchDomestic() {
      const to = moment().format("YYYYMMDD");
      const from = moment().subtract(this.monthDifference, "months").format();
      const params = { to, from };
      const url = "https://api.covid19api.com/live/country/south-korea";
      const domestic = await this.fetchData("get", url, params);
      this.setDomesticDate(domestic);
    },
    setDomesticDate(domestic) {
      let pick = 0;
      const targetDate = [];
      while (pick <= this.monthDifference) {
        targetDate.push(
          moment().subtract(pick, "months").utc().format().split("T")[0]
        );
        pick++;
      }
      this.domesticData = domestic.filter((dom) => {
        return targetDate.includes(dom.Date.split("T")[0]);
      });
      console.log(this.domesticData);
    },
  },
  computed: {
    domesticCases() {
      return {
        type: "line",
        labels: this.domesticData.map((dom) =>
          dom.Date.split("T")[0].substr(0, 7)
        ),
        datasets: [
          {
            label: "확진자",
            data: this.domesticData.map((dom) => dom.Confirmed),
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
          {
            label: "사망자",
            data: this.domesticData.map((dom) => dom.Deaths),
            backgroundColor: ["rgba(54, 162, 235, 0.2)"],
            borderColor: ["rgba(54, 162, 235, 1)"],
            borderWidth: 1,
          },
        ],
      };
    },
    domesticCompare() {
      const lastmonth = this.domesticData[this.domesticData.length - 1] || {};
      const deaths = lastmonth.Deaths;
      const confirmed = lastmonth.Confirmed;
      const data = [confirmed, deaths];
      return {
        type: "doughnut",
        labels: ["확진자", "사망자"],
        datasets: [
          {
            label: "확진자 대비 사망자",
            data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1,
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
.graph-list {
  margin-top: 20px;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1em;
}
</style>
