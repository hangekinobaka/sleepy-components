import { storiesOf } from "@storybook/vue";

import { ImageClickable } from "@component";

storiesOf("ImageClickable", module).add("Default", () => ({
  components: { ImageClickable },
  template: `
    <image-clickable style="width:200px" imgUrl="https://c.stocksy.com/a/aTf600/z9/1589406.jpg?1564473414"></image-clickable>`
}));
