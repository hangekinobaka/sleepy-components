import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// global component registeration
import { AppFooter, AppBody, AppWrapper } from "@layout";
import { ComponentHeader, ComponentBody, Card } from "@component";

Vue.component("app-wrapper", AppWrapper);
Vue.component("app-body", AppBody);
Vue.component("app-footer", AppFooter);
Vue.component("component-header", ComponentHeader);
Vue.component("component-body", ComponentBody);
Vue.component("card", Card);

new Vue({
  render: h => h(App)
}).$mount("#app");
