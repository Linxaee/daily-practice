import { createApp } from "vue";
import "../assets/init.css";
// import App from "./01-vue3-watch-1/App.vue";
// import App from "./02-vue3-debounceRef/App.vue";
// import App from "./03-vue3-watchEffect/App.vue";
// import App from "./04-vue3-自定义指令/App.vue";

// import App from "./05-vue3-vuex-useState包裹computed/App.vue";
// import store from "./05-vue3-vuex-useState包裹computed/store";

import App from "./06-vue3-vuex-map映射/App.vue";
import store from "./06-vue3-vuex-map映射/store/index";

const app = createApp(App);

app.directive("focus", {
	mounted(el) {
		el.focus();
	},
});
app.use(store).mount("#app");
