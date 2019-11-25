import { storiesOf } from "@storybook/vue";

storiesOf("AppLayout", module)

  .add("Default", () => ({
    components: {},
    data: () => ({}),
    template: `
    <app-wrapper :style= "{background:'#fff'}">
      <app-body :style="{background:'#eee'}">My App's Main Content</app-body>
      <app-footer :style="{background:'#333'}">My App's Footer</app-footer>
    </app-wrapper>`,
    methods: {

    }
  }))