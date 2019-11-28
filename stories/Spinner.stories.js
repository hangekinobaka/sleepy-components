import { storiesOf } from "@storybook/vue";
import { Spinner } from "@component";

storiesOf("Spinner", module)

  .add("Default", () => ({
    components: { Spinner },
    data: () => ({}),
    template: `<spinner/>`,
    methods: {

    }
  }))