<template>
  <div>
    <div class="file-list">
      <p v-for="fileName in fileList" :key="fileName" class="file">{{ fileName }}</p>
    </div>
    <div class="control">
      <label for="files" title="upload files">
        <img src="../../../../assets/icons/upload.svg">
      </label>
      <input v-if="!multiple" id="files" name="files" type="file" ref="files" :accept="acceptProperty" @input="onFilesChosen()" >
      <input v-else id="files" name="files" type="file" multiple ref="files" :accept="acceptProperty" @input="onFilesChosen()" >
    </div>
  </div>
</template>

<style scoped>
.file-list {
  border: 1px solid white;
  padding: 5px 10px;
}

.file {
  margin: 3px 0;
}

.control {
  display: flex;
  margin-top: 7px;
  justify-content: flex-end;
}

/* Remove the input field ... */
.control > input[type="file"] {
  height: 0;
  width: 0;
  opacity: 0;
  z-index: -1;
}

/* ... and style the lablel instead */
.control > label {
  border: 1px solid white;
  cursor: pointer;
  height: 30px;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.control > label > img {
  height: 17px;
  width: 17px;
  filter: invert(100%) sepia(3%) saturate(6%) hue-rotate(251deg) brightness(103%) contrast(100%);
}
</style>

<script>
export default {
  name: 'FileUploadInputField',
  data() {
    return {
      files: []
    }
  },
  props: {
    acceptedExt: {
      type: Array 
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onFilesChosen() {
      this.files = Object.values(this.$refs.files.files);
      this.$emit('input', !this.multiple ? this.files[0] : this.files);
    }
  },
  computed: {
    acceptProperty() {
      return this.acceptedExt.join(',');
    },
    fileList() {
      return this.files.length > 0 ? this.files.map(x => x.name) : ['nothing uploaded'];
    }
  }
}
</script>
