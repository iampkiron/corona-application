<template>
  <div class="button" style="margin-top: 20px">
    <el-radio-group fill="#2bae66" v-model="displayType">
      <el-radio-button
        v-for="(type, index) in displayTypes"
        :key="index"
        :label="index"
      >
        {{ type.alias }}
      </el-radio-button>
    </el-radio-group>
    <input type="text" v-model="keyword" placeholder="나라를 검색해보세요" />
  </div>
  <ul class="list">
    <li
      class="country"
      v-for="country in sortComputed"
      :key="country.CountryCode"
    >
      <img
        class="img"
        :src="require(`@/assets/flags/${country.CountryCode}.svg`)"
        :alt="`${country.Country}`"
      />
      <span class="name">{{ country.Country }}</span>
      <span>{{ country.NewConfirmed }}/{{ country.TotalConfirmed }}</span>
    </li>
  </ul>
</template>

<script>
import coronaMixin from "@/mixins/coronaMixin";
export default {
  name: "internationalCases",
  mixins: [coronaMixin],
  data() {
    return {
      keyword: "",
      countries: [],
      displayType: 0,
      displayTypes: [
        { alias: "Daily Worst", key: "NewConfirmed", compare: -1 },
        { alias: "Daily Best", key: "NewConfirmed", compare: 1 },
        { alias: "Total Worst", key: "NewConfirmed", compare: -1 },
        { alias: "Total Best", key: "NewConfirmed", compare: 1 },
      ],
    };
  },
  mounted() {
    this.fetchCases();
  },
  methods: {
    async fetchCases() {
      const url = "https://api.covid19api.com/summary";
      const summary = await this.fetchData("get", url);
      this.countries = summary.Countries;
    },
  },
  computed: {
    sortComputed() {
      const { compare, key } = this.displayTypes[this.displayType];
      let list = [...this.countries];
      list = list.filter((li) =>
        li.Country.toUpperCase().includes(this.keyword.toUpperCase())
      );
      return list.sort((a, b) => (a[key] > b[key] ? compare : -compare));
    },
  },
};
</script>

<style scoped>
.list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0.5em;
  margin-top: 1em;
}
.country {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5em;
  border: 1px solid #2bae66;
  border-radius: 0.2em;
}

.country .img {
  max-width: 1em;
  margin-right: 1em;
}

.country .name {
  margin-right: 1em;
  font-weight: bold;
}

.danger {
  background-color: #ffdfb9;
}

.button {
  display: flex;
  justify-content: space-between;
}

input {
  box-sizing: border-box;
  padding: 0.5em;
  width: 200px;
  border: 2px solid #2bae66;
  border-radius: 0.2em;
  outline: none;
}

input:focus {
  border: 2px solid #295f2e;
}
</style>
