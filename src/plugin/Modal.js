import { Modal, Dialog, ModalContainer } from "@component";
import { getContainer } from "@utils";

const defaultComponentName = "Modal";

const UNMOUNTED_ROOT_ERROR_MESSAGE =
  "[modal-plugin] " +
  "In order to render dynamic modals, a <modals-container> " +
  "component must be present on the page.";

const UNSUPPORTED_ARGUMENT_ERROR =
  "[modal-plugin] " +
  "$modal() received an unsupported argument as a first argument.";

/**
 * options can have these config data
 * @param {String} componentName Use your prefered name of this plugin
 * @param {Object} dynamicDefaults
 *
 */
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
    options.target = ModalContainer;
    /**
     * Plugin API
     */

    /**
     * If the first argument 'modal' is a string
     * The Static Modal will be triggered by the event 'toggle'
     */
    const showStaticModal = (modal, params) => {
      Plugin.event.$emit("toggle", modal, true, params);
    };

    /**
     * If the first argument 'modal' is an object or a function
     * The Dynamic Modal will be generated
     *
     * params can have these config data
     * @param {VueObject} root You can pass the root Vue Object to it rather than the default one, which is `this.$root`
     */
    const showDynamicModal = (modal, props, params, events) => {
      /**
       * Get root for dynamic modal
       */
      const root = params && params.root ? params.root : this.rootInstance;
      const container = getContainer(Vue, options, root);

      /**
       * Show dynamic modal
       */
      if (container) {
        container.add(modal, props, { ...dynamicDefaults, ...params }, events);
        return;
      }

      console.warn(UNMOUNTED_ROOT_ERROR_MESSAGE);
    };

    Vue.prototype.$modal = {
      show(modal, ...args) {
        switch (typeof modal) {
          case "string": {
            return showStaticModal(modal, ...args);
          }
          case "object":
          case "function": {
            return showDynamicModal(modal, ...args);
          }
          default: {
            console.warn(UNSUPPORTED_ARGUMENT_ERROR, modal);
          }
        }
      },
      hide(name, params) {
        Plugin.event.$emit("toggle", name, false, params);
      },
      toggle(name, params) {
        Plugin.event.$emit("toggle", name, undefined, params);
      }
    };
    /**
     * Sets custom component name (if provided)
     */
    Vue.component(componentName, Modal);
    /**
     * Registration of <Dialog/> component
     */
    if (options.dialog) {
      Vue.component("VDialog", Dialog);
    }
    /**
     * Registration of <ModalContainer/> component
     */
    Vue.component("ModalContainer", ModalContainer);
    Vue.mixin({
      beforeMount() {
        if (Plugin.rootInstance === null) {
          Plugin.rootInstance = this.$root;
        }
      }
    });

    console.log("Modal plugin installed!");
  }
};

export default Plugin;
