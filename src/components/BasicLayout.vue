<template>
  <div class="common-layout">
    <el-container class="el-container">
      <el-header class="el-header"><BasicHeader /></el-header>
      <el-container>
        <el-aside width="menuWidth">
          <BasicAside
            :isCollapse="isCollapse"
            @menuSelect="
              (item) => {
                $emit('menuSelect', item);
              }
            "
          />
        </el-aside>
        <el-main><slot></slot></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { computed } from "vue";
import UseBreakPoint from "@/composables/useBreakPoint";
import BasicAside from "./BasicAside.vue";
import BasicHeader from "./BasicHeader.vue";
export default {
  name: "basicLayout",
  components: { BasicHeader, BasicAside },
  setup() {
    const { type } = UseBreakPoint();
    const isCollapse = computed(() => type.value === "sm");
    const menuWidth = computed(() => {
      return isCollapse.value ? "65px" : "200px";
    });
    return {
      isCollapse,
      menuWidth,
    };
  },
};
</script>

<style scoped>
.common-layout {
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  background: #2bae66;
  color: #fcf6f5;
  display: flex;
  align-items: center;
}
</style>
