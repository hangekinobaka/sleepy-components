<template>
  <div v-if="text && text.length > 0" class="component-header">
    <span v-for="(line, i) in text" :key="i">{{ line }}</span>
  </div>
</template>

<script>
/**
 * @description For Adding headers to the component you want.
 * @param text string[] will be displayed as herader text. One string one line.
 *
 * */
export default {
  name: "ComponentHeader",
  props: {
    text: {
      type: Array,
      default: []
    }
  }
};
</script>

<style lang="scss">
.component-header {
  width: 100%;
  background: #aaa;
  font-weight: bold;
  padding: 8px;
  font-size: 16px;
  box-sizing: border-box;
  span {
    display: block;
    line-height: 20px;
  }
}
</style>
