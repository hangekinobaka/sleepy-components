import { storiesOf } from "@storybook/vue";
import { boolean } from "@storybook/addon-knobs";

import { Component } from "@component";

/* Mock Data */
const mock = {};

storiesOf("Component", module).add("Component", () => ({
  components: { Component },
  props: {
    boolSelection: {
      default: boolean("some flag", false)
    }
  },
  data: () => ({
    mockdata: mock
  }),
  methods: {},
  template: `
  <div style="max-height: 100vh; overflow-y: auto;">
  </div>
  `
}));
