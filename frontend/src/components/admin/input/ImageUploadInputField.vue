<template>
  <div>
    <div v-if="showImageSection" class="images-container center-y">
      <div v-for="(image, i) in images" :key="i" :class="imageContainerClass(image)" @mouseenter="showItemControls(image)" @mouseleave="hideItemControls(image)">
        <img :src="image.src" :class="imageClass(image, i)">
        <div :class="controlButtonClass(image)">
          <button class="delete-button center-xy" @click="toggleImageDeletion(image, i)">
            <img v-if="!image.isMarkedForDeletion" src="../../../../assets/icons/delete.svg" class="svg-red">
            <img v-else src="../../../../assets/icons/revert.svg" class="svg-white">
          </button>
        </div>
      </div>
    </div>
    <FileUploadInputField :acceptedExt="['image/*']" :multiple="true" @input="onUploadedImages" ref="fileInput" />
  </div>
</template>

<style scoped>
.images-container {
  flex-direction: column;
  border: 1px solid white;
  border-bottom: 0;
  padding: 15px 30px;
  max-height: 300px;
  overflow-y: overlay;
}

.image-container {
  border: 1px solid rgb(60, 60, 60);
  height: 220px;
  width: 100%;
  margin: 15px 0;
  position: relative;
}

.image {
  height: 100%;
  width: 100%;
  object-fit: contain;
  box-shadow: 0 0 0px rgb(104, 104, 104);
  transition: filter 0.25s linear;
}

.delete {
  filter: grayscale(100%);
}

.uploaded {
  box-shadow: 0 0 4px rgb(0, 255, 0);
}

.control-buttons {
  border-left: 1px solid gray;
  border-bottom: 1px solid gray;
  border-bottom-left-radius: 5px;
  background-color: rgb(0, 0, 0);
  display: flex;
  flex-direction: column;
  opacity: 0;
  transition: opacity 0.25s linear;
  position: absolute;
  top: 0;
  right: 0;
}

.show-controls {
  opacity: 1;
}

.control-buttons > button {
  background-color: inherit;
  min-width: 0;
  height: 20px;
  width: 20px;
  padding: 0;
  margin: 5px;
}

.control-buttons > button > img {
  height: 90%;
}
</style>

<script>
import { FileUploadInputField } from '.';
import { FileUtility } from '../../../utility/FileUtility';

export default {
  name: 'ImageUploadInputField',
  data() {
    return {
      images: this.initImages.map(image => ({
        src: image,
        isNew: false,
        isActive: false,
        isMarkedForDeletion: false
      }))
    }
  },
  props: {
    initImages: {
      type: Array,
      default: () => []
    }
  },
  components: {
    FileUploadInputField
  },
  methods: {
    emitInputEvent() {
      this.$emit('input', this.images.filter(image => !image.isMarkedForDeletion).map(image => image.src));
    },
    toggleImageDeletion(image) {
      if(!image.isNew) {
        image.isMarkedForDeletion = !image.isMarkedForDeletion;
        this.images = [...this.images];
      } else {
        this.$refs['fileInput'].removeFile(image.file);
        this.images = this.images.filter(x => x !== image);
      }
      this.emitInputEvent();
    },
    async onUploadedImages(files) {
      const uploadedImages = await Promise.all(files.map(async file => {
        const dataURL = await FileUtility.asDataURL(file);
        const uploadedImage = {
          src: dataURL,
          isNew: true,
          isActive: false,
          isMarkedForDeletion: false,
          file
        };
        return uploadedImage;
      }));
      this.images = this.images.concat(uploadedImages);
      this.emitInputEvent();
    },
    showItemControls(image) {
      image.isActive = true;
      this.images = [...this.images];
    },
    hideItemControls(image) {
      image.isActive = false;
      this.images = [...this.images];
    },
    imageContainerClass(image) {
      return [
        { class: 'image-container', condition: () => true },
        { class: 'uploaded', condition: () => image.isNew }
      ].map(x => x.condition() ? x.class : '').join(' ');
    },
    imageClass(image) {
      return [
        { class: 'image', condition: () => true },
        { class: 'delete', condition: () => image.isMarkedForDeletion }
      ].map(x => x.condition() ? x.class : '').join(' ');
    },
    controlButtonClass(image) {
      return [
        { class: 'control-buttons center-x', condition: () => true },
        { class: 'show-controls', condition: () => image.isActive }
      ].map(x => x.condition() ? x.class : '').join(' ');
    }
  },
  computed: {
    showImageSection() {
      return this.images.length > 0;
    }
  }
}
</script>
