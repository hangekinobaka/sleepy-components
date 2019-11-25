<template>
  <div class="app-footer">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "AppFooter"
};
</script>

<style lang="scss">
.app-footer {
  flex-grow: 0;

  z-index: 100;
  width: 100%;
  box-shadow: #000;
  background-color: #fff;
  margin: 0 auto;
  padding: 10px;

  & > * {
    max-width: 768px;
    margin: auto;
  }

  .app-footer-row + .app-footer-row {
    margin-top: 10px;
  }

  span + span {
    margin-left: 10px;
  }
}
</style>
