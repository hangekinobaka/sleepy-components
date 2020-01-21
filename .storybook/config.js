/* Add global comp here*/
import Vue from "vue";

// --- Stories and Knobs
import * as Storybook from "@storybook/vue";

// --- Plugins
import Modal from "@plugin/Modal";

// global component registeration
import { AppFooter, AppBody, AppWrapper } from "@layout";
import { ComponentHeader, ComponentBody, Card } from "@component";

Vue.component("app-wrapper", AppWrapper);
Vue.component("app-body", AppBody);
Vue.component("app-footer", AppFooter);
Vue.component("component-header", ComponentHeader);
Vue.component("component-body", ComponentBody);
Vue.component("card", Card);

// automatically import all files ending in *.stories.js
const req = require.context("../stories", true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

import { withKnobs } from "@storybook/addon-knobs";
Storybook.addDecorator(withKnobs);

// Use plugins
Vue.use(Modal);

Storybook.configure(loadStories, module);
