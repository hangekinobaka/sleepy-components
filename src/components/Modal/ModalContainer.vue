<template>
  <div id="modal-container">
    <modal
      v-for="modal in modals"
      :key="modal.id"
      v-bind="modal.modalProps"
      @remove="remove(modal.id)"
    >
      <component :is="modal.component" v-bind="modal.compProps" />
    </modal>
  </div>
</template>
<script>
import { generateId } from "@utils";

const PREFIX = "_dynamic_modal_";

export default {
  name: "ModalContainer",
  data() {
    return {
      modals: []
    };
  },
  created() {
    this.$root._dynamicContainer = this;
  },
  methods: {
    add(component, compProps = {}, modalProps = {}) {
      const id = generateId();
      const name = modalProps.name || PREFIX + id;
      this.modals.push({
        id,
        modalProps: { ...modalProps, name },
        component,
        compProps
      });
      console.log(this.modals);

      this.$nextTick(() => {
        this.$modal.show(name);
      });
    },
    remove(id) {
      const index = this.modals.findIndex(v => v.id === id);

      if (index !== -1) {
        this.modals.splice(index, 1);
      }
    }
  }
};
</script>
<style>
</style>
