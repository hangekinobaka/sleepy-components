import { storiesOf } from "@storybook/vue";
import { boolean } from "@storybook/addon-knobs";

import { ImageChoiceSelection } from "@component";

const mock = {
  id: 11,
  choices: [
    {
      id: 1,
      url:
        "https://sadanduseless.b-cdn.net/wp-content/uploads/2018/03/painting1.jpg"
    },
    {
      id: 2,
      url:
        "https://sadanduseless.b-cdn.net/wp-content/uploads/2018/03/painting2.jpg"
    },
    {
      id: 3,
      url:
        "https://sadanduseless.b-cdn.net/wp-content/uploads/2018/03/painting3.jpg"
    },
    {
      id: 4,
      url:
        "https://sadanduseless.b-cdn.net/wp-content/uploads/2018/03/painting4.jpg"
    }
  ],
  answers: [2]
};

storiesOf("ImageQuestion", module).add("ImageChoiceSelection", () => ({
  components: { ImageChoiceSelection },
  props: {
    canSelectAgain: {
      default: boolean("canSelectAgain", false)
    }
  },
  data: () => ({
    choices: mock,
    answer: {
      id: -1,
      isCorrect: 0
    }
  }),
  methods: {
    finishHandler(userSelection) {
      this.$data.answer = userSelection;
      setTimeout(() => {
        alert("Finished!!! You cannot select anymore!");
      }, 100);
    }
  },
  template: `
  <div style="max-height: 100vh; overflow-y: auto;">
    <image-choice-selection 
    :choices="choices" 
    :canSelectAgain="canSelectAgain"
    @finished="finishHandler">
    </image-choice-selection>

    <br />
    <p>Answer: {{answer.answer}}</p>
    <p>{{answer.isCorrect ? "Correct" : "Incorrect"}}</p>
  </div>
  `
}));
