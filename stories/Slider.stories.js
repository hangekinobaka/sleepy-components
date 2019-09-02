import { storiesOf } from "@storybook/vue";

import { Slide, SliderLayout } from "@component";

const list = ["row1", "row2", "row3", "row4", "row5"];

storiesOf("Slider", module)
  .add("Default", () => ({
    components: { SliderLayout, Slide },
    data: () => ({ activedIndex: 0 }),
    template: `
    <div>
      <slider-layout :activedIndex="activedIndex"> 
        <slide>
          <div>
            <p>slide1</p>
            <button @click="clickHandler">next</button>
          </div>
        </slide>
        <slide>
          <div>
            <p>slide2</p>
            <button @click="clickHandler">next</button>
          </div>
        </slide>
        <slide>
          <div>
            <p>slide3</p>
            <button @click="clickHandler">next</button>
          </div>
        </slide>
      </slider-layout>
    </div>`,
    methods: {
      clickHandler() {
        this.$data.activedIndex++;
      }
    }
  }))
  .add("Two Dimensions", () => ({
    components: { SliderLayout, Slide },
    data: () => ({ activedIndex: 0, list, slideLength: 0 }),
    template: `
    <div>
      <slider-layout :activedIndex="activedIndex"> 
        <template v-for="(str,index) in list">
          <slide :key="index + '.1'">
            <div>
              <p>slide1 of {{str}}</p>
              <button @click="clickHandler">next</button>
            </div>
          </slide>
          <slide :key="index + '.2'">
            <div>
              <p>slide2 of {{str}}</p>
              <button @click="clickHandler">next</button>
            </div>
          </slide>
          <slide :key="index + '.3'">
            <div>
              <p>slide3 of {{str}}</p>
              <button @click="clickHandler">next</button>
            </div>
          </slide>
        </template>
      </slider-layout>
    </div>`,
    methods: {
      clickHandler() {
        if (this.$data.activedIndex + 1 < this.$data.slideLength)
          this.$data.activedIndex++;
      }
    },
    mounted() {
      this.slideLength = this.list.length * 3;
    }
  }));
