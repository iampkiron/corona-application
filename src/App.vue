<template>
  <BasicLayout
    @menuSelect="
      (item) => {
        content = item;
      }
    "
  >
    <MainContent :content="content" />
  </BasicLayout>
</template>

<script>
import MainContent from "./components/MainContent.vue";
import BasicLayout from "./components/BasicLayout.vue";
export default {
  name: "App",
  components: {
    BasicLayout,
    MainContent,
  },
  data() {
    return {
      content: {
        label: "test",
        index: "Dashboard",
        path: "test",
      },
    };
  },
};
</script>

<style></style>
