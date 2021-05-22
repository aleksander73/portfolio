<template>
  <div>
    <div v-if="showFileList" class="file-list">
      <p v-for="fileName in fileList" :key="fileName" class="file">{{ fileName }}</p>
    </div>
    <div class="control">
      <label for="files" :title="'upload file' + (multiple ? 's' : '')" class="center-xy">
        <img src="../../../../assets/icons/upload.svg" class="svg-white">
        <p>Upload</p>
      </label>
      <input v-if="!multiple" id="files" name="files" type="file" ref="files" :accept="acceptProperty" @input="onFilesChosen()" >
      <input v-else id="files" name="files" type="file" multiple ref="files" :accept="acceptProperty" @input="onFilesChosen()" >
    </div>
  </div>
</template>

<style scoped>
.file-list {
  border: 1px solid white;
  margin-bottom: 7px;
  padding: 5px 10px;
  cursor: default;
}

.file {
  margin: 3px 0;
}

.control {
  display: flex;
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
  padding: 6px 10px;
}

.control > label > img {
  height: 20px;
  width: 20px;
}

.control > label > p {
  margin-left: 6px;
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
    },
    showFileList: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onFilesChosen() {
      this.files = Object.values(this.$refs.files.files);
      this.$emit('input', !this.multiple ? this.files[0] : this.files);
    },
    removeFile(file) {
      this.files = this.files.filter(x => x !== file);
    }
  },
  computed: {
    acceptProperty() {
      return this.acceptedExt ? this.acceptedExt.join(',') : ['*'];
    },
    fileList() {
      return this.files.length > 0 ? this.files.map(x => x.name) : ['nothing uploaded'];
    }
  }
}
</script>
