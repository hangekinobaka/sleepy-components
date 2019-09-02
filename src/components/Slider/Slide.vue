<template>
  <transition name="slide" v-if="localActived">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: "Slide",
  props: {
    actived: {
      default: false
    }
  },
  data: function() {
    return {
      // public
      localActived: this.actived,
      // private
      localSliderInfo: {
        sliderLength: 0,
        index: this.activedIndex
      }
    };
  },
  created() {
    this.$parent.slides.push(this);
  },
  beforeDestroy() {
    this.$parent.slides.splice(this.index, 1);
  },
  computed: {
    index() {
      return this.$parent.slides.indexOf(this);
    }
  },
  watch: {
    "$parent.localActivedIndex"(index, prevIndex) {
      this.localActived = this.index === index;
    }
  }
};
</script>

<style lang="scss">
.tt-slider-layout {
  .slide-enter-active,
  .slide-leave-active {
    position: fixed;
    transition: transform 0.5s;
  }
  .slide-enter {
    transform: translateX(100vw);
  }
  .slide-leave-to {
    transform: translateX(-100vw);
  }
  .slide-enter-to,
  .slide-leave {
    transform: translateX(0);
  }
}
</style>
