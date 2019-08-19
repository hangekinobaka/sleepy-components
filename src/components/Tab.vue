<template>
  <div v-show="realSelected" :class="classObject">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Tab",
  props: {
    selected: false,
    disabled: false,
    label: {
      required: true,
      type: String
    }
  },
  data: function() {
    return {
      realSelected: this.selected
    };
  },
  computed: {
    classObject() {
      const { realSelected } = this;
      return {
        "my-tab-content": true,
        animated: true,
        "is-active": realSelected,
        "is-deactive": !realSelected
      };
    },
    index() {
      return this.$parent.tabs.indexOf(this);
    }
  },
  watch: {
    // watch parent data
    "$parent.realSelectedIndex"(index, prevIndex) {
      this.realSelected = this.index === index;
    }
  },
  created() {
    this.$parent.tabs.push(this);
  },
  beforeDestroy() {
    this.$parent.tabs.splice(this.index, 1);
  }
};
</script>

<style lang="scss">
.my-tab {
  width: 100%;
}
</style>
