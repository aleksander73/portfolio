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
    onFileChosen(value) {
      if(value) {
        this.icon = {
          src: URL.createObjectURL(value)
        };
        this.$emit('input', {
          deleted: this.initIcon,
          uploaded: value
        });
      }
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
        src: require(`../../../../../server/uploads/${this.initIcon}`)
      };
    }
  }
}
</script>
