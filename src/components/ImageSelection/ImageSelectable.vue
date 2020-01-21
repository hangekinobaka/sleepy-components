<template>
  <card class="image-selectable" :class="classStr" @onClick="clickHandler">
    <component-header v-if="header" :text="header"></component-header>
    <component-body>
      <img :src="imgUrl" class="image-content" />
      <img
        v-if="iconSrc !== ''"
        class="correctness-icon"
        :src="iconSrc"
        alt="option"
      />
    </component-body>
  </card>
</template>

<script>
const Correctness = {
  unknown: "unknown",
  correct: "correct",
  incorrect: "incorrect"
};
Object.freeze(Correctness);

const ImageStatus = {
  selected: "selected",
  unselected: "unselected",
  correct: "correct",
  incorrect: "incorrect"
};
Object.freeze(ImageStatus);
/**
 * ImageSelectable
 * ==
 * A single card with image that you can select.
 ** @param id This answer's id
 ** @param imgUrl string for the url of img.
 ** @param header [optional]
 ** @param correctness "correct" | "incorrect" | "unknown" default:"unknown"
 ** @param disabled bool for switching the clickability of this card
 ** @param ableToCancel can be clicked again to cancel
 * */
export default {
  name: "ImageSelectable",
  props: {
    id: { default: undefined },
    imgUrl: { required: true },
    header: { default: undefined },
    correctness: { default: Correctness.unknown },
    disabled: { default: false },
    ableToCancel: { default: false }
  },
  data: function() {
    return {
      // private
      renderMap: {}, // For mapping the rendering properties and the status
      classStr: "", // class for rendering
      status: ImageStatus.unselected,
      iconSrc: "",
      localDisabled: false
    };
  },
  created() {
    this.localDisabled = this.disabled;
    this.initMap();
    if (this.$parent.optionList) {
      this.$parent.optionList[this.id] = this;
    }
  },
  computed: {
    index() {
      return this.$parent.slides.indexOf(this);
    }
  },
  watch: {
    correctness(newVal, oldVal) {
      if (newVal !== oldVal && this.status !== "unselected") {
        this.changeStatus();
      }
    },

    // Change the rendering whenever the status has changed
    status(newVal, oldVal) {
      if (this.renderMap) {
        const renderObj = this.renderMap.get(this.status);
        if (renderObj) {
          this.classStr = renderObj.classStr;
          this.iconSrc = renderObj.iconSrc;
        }
      }
    }
  },
  methods: {
    //*********************** private **************************/
    /** Decide how to render this image
     * There are four types of status:
     * 1, unselected: not selected or cancel the selection, show just the plain image.
     * 2, selected: selected but not show the correctness, show the red border.
     * 3, correct: selected and is correct, show the red border and the Correct icon.
     * 4, incorrect: selected and is incorrect, show the blue border and the Incorrect icon.
     */
    initMap() {
      const map = new Map();
      map.set("unselected", { classStr: "", iconSrc: "" });
      map.set("selected", { classStr: "selected-image", iconSrc: "" });
      map.set("correct", {
        classStr: "selected-image correct-image",
        iconSrc: require("@assets/icons/correct.svg")
      });
      map.set("incorrect", {
        classStr: "selected-image wrong-image",
        iconSrc: require("@assets/icons/incorrect.svg")
      });
      this.renderMap = map;
    },

    clickHandler() {
      if (!this.localDisabled) {
        this.changeStatus();
        this.$emit("imageOnClick", this.id);
      }
    },

    /**
     * If @param claer is set to true, then cancel the selection
     */
    changeStatus(clear = false) {
      if (!clear && (this.status === "unselected" || !this.ableToCancel)) {
        switch (this.correctness) {
          case "correct":
            this.status = "correct";
            break;
          case "incorrect":
            this.status = "incorrect";
            break;
          case "unknown":
            this.status = "selected";
            break;
          default:
            break;
        }
      } else {
        this.status = "unselected";
      }
    },

    //*********************** public **************************/
    /**
     * A public function for clearing the selection
     */
    clear() {
      this.changeStatus(true);
    },
    /**
     * A public function for disabling the card
     */
    disable() {
      this.localDisabled = true;
    },
    /**
     * A public function for activiting the card
     */
    active() {
      this.localDisabled = false;
    }
  }
};
</script>

<style lang="scss">
.image-selectable {
  position: relative;
  // for css grid
  align-self: stretch;
  min-height: 100px;
  .image-content {
    width: 100%;
  }

  &.selected-image {
    &::after {
      position: absolute;
      border-radius: 4px;
      border: 4px solid magenta;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      content: "";
    }
  }
  &.correct-image {
    &::after {
      border-color: magenta;
    }
  }
  &.wrong-image {
    &::after {
      border-color: mediumseagreen;
    }
  }

  .correctness-icon {
    background: rgba(#fff, 0.3);
    position: absolute;
    padding: 4px;
    width: 42px;
    height: 42px;
    right: 12px;
    bottom: 12px;
  }
}
</style>
