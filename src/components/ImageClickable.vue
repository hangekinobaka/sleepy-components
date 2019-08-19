<template>
  <div class="tt-image-clickable">
    <img class="preview-img" :src="imgUrl" @click="imgClickHandler" />

    <!-- the zoom window -->
    <div class="tt-zoom-win" v-if="showZoomWin" @click="zoomWinClickHandler" @touchmove.prevent>
      <div class="zoom-win-bg"></div>
      <div
        class="zoom-win-img"
        @touchstart="touchStartHandler"
        @touchmove="touchMoveHandler"
        @touchend="touchEndHandler"
      >
        <img :src="imgUrl" ref="zoomImg" />
      </div>
    </div>
  </div>
</template>

<script >
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
      showZoomWin: false,

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
    imgClickHandler() {
      this.$emit("onImgClick");
      console.log("zoom window opened");
      this.showZoomWin = true;
    },

    zoomWinClickHandler() {
      this.$emit("onZoomWinClick");

      // init status
      this.isZoomGesture = false;
      this.scale = 1;
      this.curScale = 1;
      this.movingDiff = [0, 0];
      console.log("zoom window closed");
      this.showZoomWin = false;
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
      this.$refs.zoomImg.style.transform = `scale(${this.curScale}) translate(${
        this.curMovingDiff[0]
      }px,${this.curMovingDiff[1]}px)`;
    }
  }
};
</script>

<style lang="scss">
.tt-image-clickable {
  img.preview-img {
    width: 100%;
    height: 100%;
  }
  .tt-zoom-win {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: 1000;
    .zoom-win-bg {
      height: 100%;
      width: 100%;
      background: #f7f7f7;
      opacity: 0.9;
    }
    .zoom-win-img {
      position: absolute;
      top: 0;
      display: flex;
      align-items: center;
      height: 100%;
      width: 100%;
      img {
        width: 100%;
      }
    }
  }
}
</style>
