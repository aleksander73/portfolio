<template>
  <div>
    <div v-if="showImageSection" class="images-container center-y">
      <div v-for="(image, i) in images" :key="i" :class="imageContainerClass(i)" @mouseenter="showItemControls(i)" @mouseleave="hideItemControls(i)">
        <img :src="image.src" :class="imageClass(image, i)" :title="imageTitle(image)">
        <div :class="controlButtonClass(i)">
          <button class="delete-button center-xy" @click="deleteImage(image, i)">
            <img v-if="!isDeleted(i)" src="../../../../assets/icons/delete.svg" class="svg-red">
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

export default {
  name: 'ImageUploadInputField',
  data() {
    return {
      images: this.initImages.map(filename => ({
        new: false,
        src: require(`../../../../../server/uploads/${filename}`),
        filename
      })),
      delete: new Array(this.initImages.length).fill(false),
      active: []
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
      this.$emit('input', {
        deleted: this.images.filter((image, index) => this.delete[index]).map(image => image.filename),
        uploaded: this.images.filter(image => image.new).map(image => image.file)
      });
    },
    deleteImage(image) {
      if(!image.new) {
        const index = this.images.indexOf(image);
        this.delete[index] = !this.delete[index];
        this.delete = [...this.delete];
      } else {
        this.$refs['fileInput'].removeFile(image.file);
        this.images = this.images.filter(x => x !== image);
      }
      this.emitInputEvent();
    },
    onUploadedImages(value) {
      this.images = this.images.filter(x => !x.new).concat(value.map(file => ({ new: true, src: URL.createObjectURL(file), file })));
      this.emitInputEvent();
    },
    showItemControls(i) {
      this.active[i] = true;
      this.active = [...this.active];
    },
    hideItemControls(i) {
      this.active[i] = false;
      this.active = [...this.active];
    },
    imageContainerClass(i) {
      return [
        { class: 'image-container', condition: () => true },
        { class: 'uploaded', condition: () => this.images[i].file }
      ].map(x => x.condition() ? x.class : '').join(' ');
    },
    imageClass(image, i) {
      return [
        { class: 'image', condition: () => true },
        { class: 'delete', condition: () => this.delete[i] }
      ].map(x => x.condition() ? x.class : '').join(' ');
    },
    imageTitle(image) {
      return !image.new ? image.filename : image.file.name;
    },
    controlButtonClass(i) {
      return [
        { class: 'control-buttons center-x', condition: () => true },
        { class: 'show-controls', condition: () => this.active[i] }
      ].map(x => x.condition() ? x.class : '').join(' ');
    },
    isDeleted(i) {
      return this.delete[i];
    }
  },
  computed: {
    showImageSection() {
      return this.images.length > 0;
    }
  }
}
</script>
