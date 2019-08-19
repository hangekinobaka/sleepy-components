/* Add global comp here*/
// import Vue from "vue";
// import Vuex from "vuex";

// // --- Global components
// import AppWrapper from "@joyz/benesse-app/src/components/AppWrapper.vue";

// Vue.component("app-wrapper", AppWrapper);

// // Global SCSS
// import "@joyz/core/styles/core.scss";

// // Vuex Store
// Vue.use(Vuex);
/* Add global comp here*/

// --- Stories and Knobs
import { configure } from "@storybook/vue";

// automatically import all files ending in *.stories.js
const req = require.context("../stories", true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
