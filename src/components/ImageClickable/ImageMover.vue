<template>
  <div
    class="modal-image-mover"
    @touchstart="touchStartHandler"
    @touchmove="touchMoveHandler"
    @touchend="touchEndHandler"
  >
    <!-- @contextmenu.prevent: quick fix for image downlaod on Desktop / Android -->
    <img ref="zoomImg" :src="imgUrl" class="image-full" @contextmenu.prevent />
  </div>
</template>

<script>
const MIN_SCALE = 0.1;
const MAX_SCALE = 10;

export default {
  name: "ImageMover",
  props: {
    imgUrl: {
      required: true,
      type: String
    }
  },
  data: function() {
    return {
      isZoomGesture: false,
      startPoints:[],
      scale: 1,
      curScale: 1,
        /* END of zoom in and out */
        /* this part is for move */
      startPoint: [0, 0],
      curMovingDiff: [0, 0],
      movingDiff: [0, 0],
        /* END of move */
      movingStart: false,
      zoomingStart: false,
    }
  },
  created() {
    this.init();
  },
  methods: {
    // init all of the status
    init() {
      this.isZoomGesture = false;
      this.scale = 1;
      this.curScale = 1;
      this.movingDiff = [0, 0];
    },

    // When start touching, detect if it is a zoom gesture or move gesture
    touchStartHandler(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();
      this.startPoints = e.touches; // get first points
      // Decide if it is multi touch
      if (e.touches.length >= 2) {
        // when multi, it is resize
        this.isZoomGesture = true;
        if (!this.movingStart) {
          this.startPoint = this.getMidpoint(this.startPoints[0], this.startPoints[1]);
          this.zoomingStart = true;
        }
        // this.startPoint = this.getMidpoint(this.startPoints[0], this.startPoints[1]);
        // this.startPoint = [this.startPoints[1].pageX, this.startPoints[1].pageY];
      } else {
        this.movingStart = true;
        this.startPoint = [this.startPoints[0].pageX, this.startPoints[0].pageY];
      }
    },

    touchMoveHandler(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();
      const movingPoints = e.touches; // get moving motion points
      let movingPoint;
      let scale = this.curScale,
        movingDiff = [0, 0];
      if (e.touches.length >= 2) {
        scale =
          this.scale *
          (this.getDistance(movingPoints[0], movingPoints[1]) /
            this.getDistance(this.startPoints[0], this.startPoints[1])); // get the scale ratio
        // Limit zoom-out
        scale = Math.min(Math.max(MIN_SCALE, scale), MAX_SCALE);
        if (!this.movingStart) {
          movingPoint = this.getMidpoint(movingPoints[0], movingPoints[1]);
          movingDiff = this.getPosDiff(this.startPoint, movingPoint, scale);
        } else {
          movingPoint = [movingPoints[0].pageX, movingPoints[0].pageY];
          movingDiff = this.getPosDiff(this.startPoint, movingPoint, scale);
        }
      } else if (!this.zoomingStart) {
        movingPoint = [movingPoints[0].pageX, movingPoints[0].pageY];
        movingDiff = this.getPosDiff(this.startPoint, movingPoint, scale);
      }
      this.setImg(scale, movingDiff);
    },

    touchEndHandler(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();
      this.scale = this.curScale;
      this.movingDiff = this.curMovingDiff;
      this.movingStart = false;
      this.zoomingStart = false;
    },

    /*
    *  Get the middle point of two points
    */
    getMidpoint(p1, p2) {
      const x = (p1.pageX + p2.pageX) / 2;
      const y = (p1.pageY + p2.pageY) / 2;
      return [x, y];
    },

    /*
    * Get the distance between two points
    */
    getDistance(p1, p2) {
      if(!p1 || !p2) return;
      const x = p2.pageX - p1.pageX;
      const y = p2.pageY - p1.pageY;
      return Math.sqrt(x * x + y * y);
    },

    /*
    * Get the pos difference between two points
    */
    getPosDiff(start, end, scale) {
      return [
        this.movingDiff[0] + (end[0] - start[0]) / scale,
        this.movingDiff[1] + (end[1] - start[1]) / scale
      ];
    },

    setImg(scale, movingDiff) {
      this.curScale = scale;
      this.curMovingDiff = movingDiff;
      if(!this.$refs || !this.$refs.zoomImg) return;
      this.$refs.zoomImg.style.transform = `scale(${scale}) translate(${movingDiff[0]}px,${movingDiff[1]}px)`;
    }
  }
}
</script>

<style lang="scss">
.modal-image-mover {
  display: flex;
  align-items: center;
  justify-content:space-around;
  top: 0;
  bottom: 0;
  width: 100%;
  .image-full {
    object-fit: contain;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>