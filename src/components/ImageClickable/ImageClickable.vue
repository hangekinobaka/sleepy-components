<template>
  <div class="image-clickable">
    <img class="preview-img" :src="imgUrl" @click="imgClickHandler" />
  </div>
</template>

<script>
import ImageMover from "./ImageMover.vue";

export default {
  name: "ImageClickable",
  components: { ImageMover },
  props: {
    imgUrl: {
      required: true,
      type: String
    }
  },
  data: function() {
    return {
      showZoomWin: false
    };
  },
  methods: {
    showImageModal() {
      this.$modal.show(
        {
          template: `
          <div class="modal-box" >
            <component :is="ImageMover" :imgUrl="imgUrl" ref="imageMover"></component >
          </div>
        </div>
      `,
          props: ["iconClose", "imgUrl", "ImageMover"]
        },
        {
          iconClose: this.iconClose,
          imgUrl: this.imgUrl,
          ImageMover: ImageMover
        },
        {
          name: "imageModal",
          buffer: false,
          closeOnBackgroundClick: false,
          skill: this.skill
        }
      );
    },
    imgClickHandler() {
      this.$emit("onImgClick");
      this.showImageModal();
    }
  }
};
</script>

<style lang="scss">
.image-clickable {
  user-select: auto;
  img.preview-img {
    width: 100%;
    height: 100%;
  }
}

.modal-box {
  .image-mover {
    width: 100%;
  }
}
</style>
