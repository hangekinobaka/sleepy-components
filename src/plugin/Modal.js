// import Modal from './Modal.vue'
// import Dialog from './Dialog.vue'
// import ModalsContainer from './ModalsContainer.vue'
import { createDivInBody } from "../utils";

const defaultComponentName = "Modal";

const Plugin = {
  install(Vue, options = {}) {
    /**
     * Makes sure that plugin can be installed only once
     */
    if (this.installed) {
      return;
    }

    this.installed = true;
    this.event = new Vue();
    this.rootInstance = null;

    const componentName = options.componentName || defaultComponentName;
    const dynamicDefaults = options.dynamicDefaults || {};
    /**
     * Plugin API
     */
    console.log("Modal plugin installed!");
  }
};

export default Plugin;
