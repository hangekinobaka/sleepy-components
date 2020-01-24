<template>
  <div class="tt-image-choice-selection">
    <image-selectable
      v-for="(choice, i) in choices.choices"
      :id="choice.id"
      :key="i"
      :img-url="choice.url"
      :header="header(choice.id)"
      :correctness="correctness(choice.id)"
      @imageOnClick="imageClickHandler"
    >
    </image-selectable>
  </div>
</template>

<script>
import ImageSelectable from "./ImageSelectable.vue";

import { dictionary } from "@utils";

/**
 * ImageChoiceSelection
 * ==
 * Single choice question with images.
 ** @param choices the component data
 ** @param canSelectAgain Does the user only have one chance? no for default
 * */
export default {
  name: "ImageChoiceSelection",
  components: { ImageSelectable },
  props: {
    choices: { required: true },
    canSelectAgain: { default: false }
  },
  data: function() {
    return {
      // private
      userSelection: { id: -1, answer: [-1], isCorrect: 0 },
      // public
      optionList: {} // Option comps storage
    };
  },
  watch: {
    onCanSelectAgainChange(newVal, oldVal) {
      if (!this.userSelection.isCorrect) {
        for (let key in this.optionList) {
          if (newVal) this.optionList[key].active();
          else this.optionList[key].disable();
        }
        if (!newVal) this.$emit("finished", this.userSelection);
      }
    }
  },
  methods: {
    // get choice header by searching for the dictionary
    header(id) {
      return [dictionary[id]];
    },
    // get the correctness for the current option
    correctness(id) {
      return id === this.choices.answers[0] ? "correct" : "incorrect";
    },
    imageClickHandler(id) {
      const userSelection = {
        id: this.choices.id,
        answer: this.choices.answers,
        isCorrect: id === this.choices.answers[0] ? 1 : 0
      };
      this.userSelection = userSelection;

      for (let key in this.optionList) {
        if (this.canSelectAgain) {
          const numKey = parseInt(key);
          if (numKey !== id) {
            this.optionList[key].clear();
          }
          if (userSelection.isCorrect) {
            this.optionList[key].disable();
          }
        } else {
          this.optionList[key].disable();
        }
      }
      if (userSelection.isCorrect || !this.canSelectAgain) {
        this.$emit("finished", userSelection);
      }
    }
  }
};
</script>

<style lang="scss">
.tt-image-choice-selection {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
}
</style>
