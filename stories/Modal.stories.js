import { storiesOf } from "@storybook/vue";
import {} from "@component";

storiesOf("Modal", module).add("default", () => ({
  components: {},
  template: `
    <button @click="showDynamicRuntimeModal">Show</button>
  `,
  methods: {
    showDynamicRuntimeModal() {
      this.$modal.show({
        template: `
          <div class="example-modal-content">
            <h1>This is created inline</h1>
            <p>{{ text }}</p>
            <p>Default Property: {{ foo }}</p>
          </div>
        `,
        props: ["text", "foo"]
      });
    }
  }
}));
