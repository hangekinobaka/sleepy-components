import { storiesOf } from "@storybook/vue";
import { array, optionsKnob, boolean } from "@storybook/addon-knobs";

import { ImageSelectable } from "@component";

storiesOf("ImageQuestion", module).add("ImageSelectable", () => ({
  components: { ImageSelectable },
  props: {
    header: { default: array("header", ["A title"]) },
    correctness: {
      default: optionsKnob(
        "correctness",
        {
          correct: "correct",
          incorrect: "incorrect",
          unknown: "unknown"
        },
        "unknown",
        {
          display: "inline-radio"
        }
      )
    },
    ableToCancel: {
      default: boolean("Can click again to cancel the selection?", false)
    }
  },
  data: () => ({}),
  methods: {},
  template: `
  <div style="max-height: 100vh; overflow-y: auto;">
    <image-selectable
      style="width:200px;" 
      img-url="https://icon-library.net/images/fake-icon/fake-icon-22.jpg"
      :header="header"
      :correctness="correctness"
      :ableToCancel="ableToCancel"
    ></image-selectable>
  </div>
  `
}));
