import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// global component registeration
import {
  AppFooter,
  AppBody,
  AppWrapper
} from "@layout";

Vue.component("app-wrapper", AppWrapper);
Vue.component("app-body", AppBody);
Vue.component("app-footer", AppFooter);

new Vue({
  render: h => h(App)
}).$mount("#app");
