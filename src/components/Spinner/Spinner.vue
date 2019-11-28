<template>
  <div class="spinner-icon">
    <svg class="spinner" viewBox="25 25 50 50">
      <circle
        class="path"
        cx="50"
        cy="50"
        fill="none"
        r="20"
        stroke-width="4"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "Spinner"
};
</script>

<style lang="scss">
$spinner-size: 64px;

.spinner-icon {
  width: $spinner-size;
  height: $spinner-size;
  margin: 0 auto;

  .spinner {
    position: relative;
    width: $spinner-size;
    height: $spinner-size;
    animation: rotate 2s linear infinite;
  }

  .path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite, colors 6s ease-in-out infinite;
    stroke-linecap: round;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }

  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}

@keyframes colors {
  0% {
    stroke: mediumaquamarine;
  }
  25% {
    stroke: salmon;
  }
  50% {
    stroke: mediumaquamarine;
  }
  75% {
    stroke: salmon;
  }
  100% {
    stroke: mediumaquamarine;
  }
}
</style>