<template>
  <div>
    <img v-for="(image, index) in initPictures" :key="image" :src="imageSrc(image)" @click="toggleDeletedImage(index)">
    <FileUploadInputField :acceptedExt="['image/*']" :multiple="true" @input="onUploadedImages" />
    <img v-for="image in uploadedImages" :key="image.file.name" :src="image.preview">
  </div>
</template>

<style scoped>
img {
  height: 100px;
  width: 250px;
  margin: 5px;
}
</style>

<script>
import { FileUploadInputField } from '.';

export default {
  name: 'ImageUploadInputField',
  data() {
    return {
      deletedImages: [],
      uploadedImages: []
    }
  },
  props: {
    initPictures: {
      type: Array
    }
  },
  components: {
    FileUploadInputField
  },
  methods: {
    emitInputEvent() {
      this.$emit('input', {
        deleted: this.initPictures.filter((picture, index) => this.deletedImages[index]),
        uploaded: this.uploadedImages.map(image => image.file)
      });
    },
    toggleDeletedImage(index) {
      this.deletedImages[index] = !this.deletedImages[index];
      this.emitInputEvent();
    },
    onUploadedImages(value) {
      value.forEach(file => {
        this.uploadedImages.push({ file, preview: URL.createObjectURL(file) });
      });
      this.emitInputEvent();
    },
    imageSrc(image) {
      return require(`../../../../../server/uploads/${image}`);
    }
  },
  created() {
    for(let i = 0; i < this.initPictures.length; i++) {
      this.deletedImages[i] = false;
    }
  }
}
</script>
