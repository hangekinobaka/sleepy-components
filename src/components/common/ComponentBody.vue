<template>
  <div class="component-body">
    <slot></slot>
  </div>
</template>

<script>
/**
 * @description For Adding body to the component you want.
 *
 * */
export default {
  name: "ComponentBody"
};
</script>

<style lang="scss">
.component-body {
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
}
</style>