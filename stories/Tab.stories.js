import { storiesOf } from "@storybook/vue";
import TabLayout from "@component/TabLayout";
import Tab from "@component/Tab";

storiesOf("Tab", module)
  .add("default", () => ({
    components: { Tab, TabLayout },
    template: `
  <tab-layout>
    <tab label="tab1">this is tab 1</tab>
    <tab label="tab2">this is tab 2</tab>
  </tab-layout>
  `
  }))
  .add("three tabs", () => ({
    components: { Tab, TabLayout },
    template: `
  <tab-layout>
    <tab label="tab1">this is tab 1</tab>
    <tab label="tab2" :selected="true">this is tab 2</tab>
    <tab label="tab3">this is tab 3</tab>
  </tab-layout>`
  }))
  .add("four tabs", () => ({
    components: { Tab, TabLayout },
    template: `
  <tab-layout>
    <tab label="tab1">this is tab 1</tab>
    <tab label="tab2">this is tab 2</tab>
    <tab label="tab3">this is tab 3</tab>
    <tab label="tab4">this is tab 4</tab>
  </tab-layout>`
  }));
