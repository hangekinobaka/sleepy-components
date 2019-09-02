<template>
  <div class="tt-slider-layout">
    <slot></slot>
  </div>
</template>

<script>
/**
 * This slider watch the props "activedIndex" for rendering slide's index
 *
 * You can pass an object as v-model to receive the info from the slider,
 * including slider's length and current index
 * sliderInfo: { sliderLength: number; index: number }
 * eg.
 *
 */
export default {
  name: "SliderLayout",
  props: {
    activedIndex: {
      required: true,
      type: Number
    },
    sliderInfo: {}
  },
  data: function() {
    return {
      // public
      slides: [],
      localActivedIndex: -1,

      // private
      localSliderInfo: {
        sliderLength: 0,
        index: this.activedIndex
      }
    };
  },
  model: {
    prop: "sliderInfo",
    event: "infoChange"
  },
  mounted() {
    this.loadList();
    if (this.localActivedIndex === -1) {
      this.showSlide(this.activedIndex);
    }

    this.localSliderInfo.sliderLength = this.slides.length;
    this.$emit("infoChange", this.localSliderInfo);
  },
  watch: {
    activedIndex(index, prevIndex) {
      this.showSlide(index);
      this.localSliderInfo.index = index;
      this.$emit("infoChange", this.localSliderInfo);
    }
  },
  methods: {
    loadList() {
      for (const slide of this.slides) {
        if (slide.localActived) {
          this.showSlide(slide.index);
          break;
        }
      }
    },
    showSlide(index) {
      if (index < this.slides.length) this.localActivedIndex = index;
      else console.log(`No slide ${index}`);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>