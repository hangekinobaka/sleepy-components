<template>
  <div class="app-wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "AppWrapper"
};
</script>

<style lang="scss">
.app-wrapper {
  display: flex;
  flex-direction: column;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
