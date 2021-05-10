<template>
  <div>
    <div class="file-list">
      <p v-for="fileName in fileList" :key="fileName" class="file">{{ fileName }}</p>
    </div>
    <div class="control">
      <label for="files">Upload</label>
      <input id="files" name="files" type="file" multiple ref="files" @input="onFilesChosen()" >
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
  background-color: rgb(0, 115, 175);
  border-radius: 3px;
  color: white;
  cursor: pointer;
  font-size: 1em;
  padding: 5px 10px;
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
  methods: {
    onFilesChosen() {
      this.files = Object.values(this.$refs.files.files);
      this.$emit('input', this.files);
    }
  },
  computed: {
    fileList() {
      return this.files.length > 0 ? this.files.map(x => x.name) : ['(no files uploaded)'];
    }
  }
}
</script>
