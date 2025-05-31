<template>
  <div class="single-image-upload-input-field-container center-y">
    <div v-if="icon" class="icon-container">
      <img :src="icon.src" :class="iconClass()">
    </div>
    <FileUploadInputField :acceptedExt="['image/*']" :showFileList="false" @input="onFileChosen" />
  </div>
</template>

<style scoped>
.single-image-upload-input-field-container {
  justify-content: flex-start;
  margin: 10px 0;
}

.icon-container {
  height: 50px;
  margin-right: 25px;
}

.icon {
  height: 100%;
}
</style>

<script>
import { FileUploadInputField } from '.';
import { FileUtility } from '../../../utility/FileUtility';

export default {
  name: 'SingleImageUploadInputField',
  data() {
    return {
      icon: null
    }
  },
  props: {
    initIcon: {
      type: String
    }
  },
  components: {
    FileUploadInputField
  },
  methods: {
    async onFileChosen(file) {
      if(!file) {
        return;
      }

      const dataURL = await FileUtility.asDataURL(file);
      this.icon = {
        src: dataURL
      };
      this.$emit('input', dataURL);
    },
    iconClass() {
      return [
        { class: 'icon', condition: () => true },
        { class: 'svg-white', condition: () => this.icon.isDefault }
      ].map(x => x.condition() ? x.class : '').join(' ');
    }
  },
  created() {
    if(this.initIcon) {
      this.icon = {
        src: this.initIcon
      };
    }
  }
}
</script>
