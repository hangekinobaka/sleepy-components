<template>
  <!-- @contextmenu.prevent: quick fix for image downlaod on Desktop / Android -->
  <img
    class="image-mover"
    @touchstart="touchStartHandler"
    @touchmove="touchMoveHandler"
    @touchend="touchEndHandler"
    ref="zoomImg"
    :src="imgUrl"
    @contextmenu.prevent
  />
</template>

<script>
const MIN_SCALE = 0.1;

export default {
  name: "ImageClickable",
  props: {
    imgUrl: {
      required: true,
      type: String
    }
  },
  data: function() {
    return {
      /* this part is for zoom in and out */
      isZoomGesture: false,
      startPoints: undefined,
      scale: 1,
      curScale: 1,
      /* END of zoom in and out */
      /* this part is for move */
      startPoint: [0, 0],
      curMovingDiff: [0, 0],
      movingDiff: [0, 0]
      /* END of move */
    };
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
      this.startPoints = e.touches; // get first points

      // Decide if it is multi touch
      if (e.touches.length >= 2) {
        // when multi, it is resize
        this.isZoomGesture = true;

        this.startPoint = this.getMidpoint(
          this.startPoints[0],
          this.startPoints[1]
        );
      } else {
        this.isZoomGesture = false;
        this.startPoint = [
          this.startPoints[0].pageX,
          this.startPoints[0].pageY
        ];
      }
    },
    touchMoveHandler(e) {
      const movingPoints = e.touches; // get moving motion points
      let movingPoint;

      if (e.touches.length >= 2 && this.isZoomGesture) {
        this.curScale =
          this.scale *
          (this.getDistance(movingPoints[0], movingPoints[1]) /
            this.getDistance(this.startPoints[0], this.startPoints[1])); // get the scale ratio

        movingPoint = this.getMidpoint(movingPoints[0], movingPoints[1]);
        this.curMovingDiff = this.getPosDiff(this.startPoint, movingPoint);
      } else if (!this.isZoomGesture) {
        movingPoint = [movingPoints[0].pageX, movingPoints[0].pageY];
        this.curMovingDiff = this.getPosDiff(this.startPoint, movingPoint);
      }
      this.setImg();
    },
    touchEndHandler(e) {
      if (this.isZoomGesture && e.touches.length >= 2) {
        this.isZoomGesture = false;
      }
      this.scale = this.curScale;
      this.movingDiff = this.curMovingDiff;
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
      const x = p2.pageX - p1.pageX;
      const y = p2.pageY - p1.pageY;
      return Math.sqrt(x * x + y * y);
    },
    /*
     * Get the pos difference between two points
     */
    getPosDiff(start, end) {
      return [
        this.movingDiff[0] + end[0] - start[0],
        this.movingDiff[1] + end[1] - start[1]
      ];
    },
    /*
     * Get the angle of two points
     */
    // getAngle(p1, p2) {
    //   const x = p1.pageX - p2.pageX;
    //   const y = p1.pageY - p2.pageY;
    //   return (Math.atan2(y, x) * 180) / Math.PI;
    // }
    /*
     * Set the calculated data to the img element
     */
    setImg() {
      this.$refs.zoomImg.style.transform = `scale(${this.curScale}) translate(${this.curMovingDiff[0]}px,${this.curMovingDiff[1]}px)`;
    }
  }
};
</script>

<style lang="scss"></style>
