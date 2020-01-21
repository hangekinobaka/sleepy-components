<template>
  <div class="card" :class="classObj" @click="$emit('onClick')">
    <slot />
  </div>
</template>

<script>
/**
 * @description It's a card, you know, just a card
 * @param stretch Flag Take the full screen or not.
 *
 * */
export default {
  name: "Card",
  props: {
    stretch: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classObj() {
      return {
        "card-stretch": this.stretch
      };
    }
  }
};
</script>

<style lang="scss">
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: center;
  align-items: center;

  box-shadow: 0px 2px 4px #333;
  width: 100%;
  height: auto;
  margin: 0 auto 8px;
  border-radius: 8px;
  background-color: #fff;
  overflow: hidden;

  &.tt-card-stretch {
    flex-grow: 1;
    margin: 0 auto;
  }
}
</style>
