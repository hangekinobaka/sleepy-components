<template>
  <div class="my-tab-layout">
    <ul class="my-tab-label-list">
      <li
        v-for="(tab, index) in tabs"
        :class="{ 'is-active': isActived(index), 'is-disabled': tab.disabled, 'is-flex': true }"
        :key="index"
        :selected="isActived(index)"
        :disabled="tab.disabled"
        @click="select(index)"
      >
        <a class="my-tab-label">
          <span>{{ tab.label }}</span>
        </a>
      </li>
    </ul>

    <div class="my-tab-panel">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabLayout",
  data: function() {
    return {
      realSelectedIndex: -1,
      // the actual tab list data
      tabs: []
    };
  },
  methods: {
    loadList() {
      // when mounted, load the tab list data
      for (const tab of this.tabs) {
        if (!tab.disabled && tab.realSelected) {
          this.select(tab.index);
          break;
        }
      }
    },
    isActived(index) {
      return index === this.realSelectedIndex;
    },
    select(index) {
      this.$emit("tab-selected", index);
      this.realSelectedIndex = index;
    }
  },
  mounted() {
    this.loadList();
    if (this.realSelectedIndex === -1) {
      this.select(0);
    }
  }
};
</script>

<style lang="scss">
.my-tab-layout {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  ul.my-tab-label-list {
    display: flex;
    align-items: center;
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    justify-content: flex-start;
    list-style: none;
    background: #f3f3f3;
    padding: 0;
    margin: 0;
    li {
      width: 100%;
      a.my-tab-label {
        text-decoration: none;

        align-items: center;
        color: #000;
        display: flex;
        justify-content: center;
        margin-bottom: -1px;
        vertical-align: top;
        span {
          font-family: Mplus1p-Regular;
          font-size: 12px;
          line-height: 46px;
          border-bottom: 3px solid transparent;
          font-weight: normal;
        }
      }
      &.is-active {
        background: #fff;
        a.my-tab-label {
          span {
            font-size: 15px;
            font-family: Mplus1p-Bold;
            border-bottom-color: powderblue;
            font-weight: bold;
          }
        }
      }
    }
  }

  .my-tab-panel {
    flex-direction: column;
    overflow: hidden;
    position: relative;
    margin: 0;
    flex: 1 1;
    display: flex;

    .my-tab-content {
      width: 100%;
      flex: 1 1;
    }
  }
}
</style>
