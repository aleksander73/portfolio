<template>
  <div>
    <div class="file-list">
      <p v-for="fileName in fileList" :key="fileName" class="file">{{ fileName }}</p>
    </div>
    <div class="control">
      <input name="pictures" id="pictures" type="file" multiple ref="files" @input="onFilesChosen()" >
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
  justify-content: flex-end;
}

.control {
  display: flex;
  margin-top: 10px;
  justify-content: flex-start;
}

.control > input[type="file"] {
  font-size: 0.8em;
  outline: none;
  width: 91px;
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
