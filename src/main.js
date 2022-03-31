import { createApp } from "vue";
import App from "./App.vue";

// element-plus
import ElementPlus from "element-plus";
import ElementPlusCSS from "../node_modules/element-plus/dist/index.css";

// reset-css
import "@/styles/main.css";

const app = createApp(App);
app.use(ElementPlus);
app.use(ElementPlusCSS);
app.mount("#app");
