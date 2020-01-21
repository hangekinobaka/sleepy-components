<template>
  <div class="app-body">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "AppBody"
};
</script>

<style lang="scss">
.app-body {
  flex-grow: 1;
  overflow: auto;
  z-index: 10;

  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  padding: 10px;
}
</style>
