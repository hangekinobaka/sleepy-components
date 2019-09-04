<template>
  <transition name="overlay-fade">
    <div v-if="visibility.overlay" ref="modalOverlay" class="modal-overlay" :data-modal="name">
      <div
        class="modal-background-click"
        @mousedown.self="handleBackgroundClick"
        @touchstart.self="handleBackgroundClick"
      ></div>
      <div class="modal-layout">
        <transition name="modal-fade">
          <div v-if="visibility.modal" ref="modal" class="modal-box">
            <slot />
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>
<script>
import Modal from "@plugin/Modal";

/**
 * You can have these props to modify the Modal component
 * @param {String} name required for static component, for the dynamic Modal, it generate a name with id as default
 * @param {Number} delay time gap between the apperance of the overlay and the modal itselt
 * @param {Boolean} isDynamic if it is a dynamic conponent, no need to pass, generate automatically
 * @param {Boolean} clickToClose click the backgroud to close or not
 * @param {Boolean} buffer only fo rthe dynamic Modal. When the modal is closed, do we store it as a buffer or remove it.
 *
 */
export default {
  name: "Modal",
  props: {
    name: {
      // This is an indentifier for toggle calling
      required: true,
      type: String
    },
    delay: {
      type: Number,
      default: 0
    },
    isDynamic: {
      type: Boolean,
      default: false
    },
    clickToClose: {
      type: Boolean,
      default: true
    },
    buffer: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show: false,
      visibility: {
        modal: false,
        overlay: false
      }
    };
  },
  /**
   * Sets global listeners
   */
  beforeMount() {
    // Add listener to the Modal plugin
    Modal.event.$on("toggle", this.handleToggleEvent);
  },
  /**
   * Removes global listeners
   */
  beforeDestroy() {
    // Remove listener to the Modal plugin
    Modal.event.$off("toggle", this.handleToggleEvent);
  },
  computed: {},
  watch: {
    /**
     * Sets the visibility.
     * Events 'open' and 'close' is called here
     */
    show(val) {
      // Different behaviour based on if next state is close or open
      if (val) {
        this.visibility.overlay = true;
        setTimeout(() => {
          this.visibility.modal = true;
          this.$nextTick(() => {
            this.$emit("open");
          });
        }, this.delay);
      } else {
        this.visibility.modal = false;
        setTimeout(() => {
          this.visibility.overlay = false;
          this.$nextTick(() => {
            this.$emit("close");
            // If the buffer switch is off, remove the modal from the page
            if (this.isDynamic && !this.buffer) {
              this.$emit("remove");
            }
          });
        }, this.delay);
      }
    }
  },
  methods: {
    handleToggleEvent(name, state, params) {
      if (this.name === name) {
        const nextState = state === undefined ? !this.show : state;

        this.toggle(nextState, params);
      }
    },

    /**
     * Handle the toggle behaviour
     */
    toggle(nextState) {
      this.show = nextState;
    },

    /**
     * Handle the background click behaviour
     */
    handleBackgroundClick() {
      if (this.clickToClose) {
        this.toggle(false);
      }
    }
  }
};
</script>
<style>
.modal-overlay {
  position: fixed;
  box-sizing: border-box;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  z-index: 999;
  opacity: 1;
}

.modal-overlay .modal-background-click {
  position: fixed;
  width: 100%;
  min-height: 100%;
  height: auto;
}
.modal-layout {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.modal-box {
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  height: auto;
  min-height: 300px;
  min-width: 40%;
  max-height: 70%;
  max-width: 80%;
  background-color: white;
  text-align: left;
  border-radius: 3px;
  box-shadow: 0 20px 60px -2px rgba(27, 33, 58, 0.4);
  padding: 0;
}

.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: all 0.2s;
}

.overlay-fade-enter,
.overlay-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.4s;
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
