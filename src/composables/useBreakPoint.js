import { computed, ref, onMounted, onUnmounted } from "vue";

export default function useBreakPoint() {
  let windowWidth = ref(window.innerWidth);
  console.log(windowWidth);
  const onChangeWidth = () => {
    windowWidth.value = window.innerWidth;
  };
  onMounted(() => window.addEventListener("resize", onChangeWidth));
  onUnmounted(() => window.addEventListener("resize", onChangeWidth));

  const type = computed(() => {
    let size = "sm";
    if (windowWidth.value > 549 && windowWidth.value < 1200) {
      size = "md";
    }
    if (windowWidth.value > 1199) {
      size = "lg";
    }
    return size;
  });

  return { type };
}
