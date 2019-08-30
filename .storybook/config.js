/* Add global comp here*/
import Vue from "vue";

// --- Stories and Knobs
import { configure } from "@storybook/vue";

// --- Plugins
import Modal from "@/plugin/Modal";

// automatically import all files ending in *.stories.js
const req = require.context("../stories", true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

// Use plugins
Vue.use(Modal);

configure(loadStories, module);
