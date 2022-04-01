<template>
  <h1>{{ content.label }}</h1>
  <component :is="targetComponent"></component>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  name: "mainContent",
  props: {
    content: {
      type: Object,
      default() {
        return {
          label: "Test Menu",
          path: "Test",
          index: "TestMenu",
        };
      },
    },
  },
  data() {
    return { targetComponent: null };
  },
  watch: {
    content: {
      deep: true,
      handler: function (newValue) {
        this.targetComponent = defineAsyncComponent(() => {
          return import(`@/components/${newValue.path}/${newValue.index}`);
        });
      },
    },
  },
};
</script>

<style></style>
