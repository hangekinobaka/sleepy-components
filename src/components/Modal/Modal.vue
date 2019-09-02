<template>
  <transition :name="animationName">
    <div
      v-if="visibility.box"
      ref="modalBox"
      :class="overlayClass"
      :aria-expanded="visibility.overlay.toString()"
      :data-modal="name"
    >
      <div
        class="v--modal-background-click"
        @mousedown.self="handleBackgroundClick"
        @touchstart.self="handleBackgroundClick"
      ></div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "Modal",
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>
<style>
</style>
