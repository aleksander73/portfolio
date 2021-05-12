<template>
  <div class="window-container">
    <div class="window">
      <div class="title-container">
        <h1>{{ title }}</h1>
      </div>
      <div class="input-fields-container">
        <div class="input-fields">
          <div class="input-field-container">
            <p>Tag</p>
            <TextInputField :initValue="tag" @input="onTagChanged" />
          </div>
          <div class="input-field-container">
            <p>Name</p>
            <TextInputField :initValue="name" @input="onNameChanged" />
          </div>
          <div class="input-field-container">
            <p>Icon</p>
            <FileUploadInputField :acceptedExt="['image/*']" @input="onIconChanged" />
          </div>
        </div>
      </div>
      <div class="bottom-panel">
        <div class="divide"></div>
        <div class="button-panel">
          <button class="btn-cancel" @click="cancel()">Cancel</button>
          <button :class="actionButtonClass()" @click="mainAction()">{{ buttonLabel }}</button> 
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.window-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 70px;
  height: 100vh;
  width: calc(100vw - 70px);
}

.window {
  background-color: black;
  border: 1px solid white;
  height: 75%;
  width: 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.window > * {
  width: 100%;
}

.window > *:last-child {
  position: absolute;
  bottom: 0;
}

.title-container {
  text-align: center;
  font-size: 0.55em;
  border-bottom: 1px solid white;
}

.title-container > h1 {
  margin: 5px 0;
}

.input-fields-container {
  display: flex;
  justify-content: center;
  overflow-y: overlay;
  height: 80%;
}

.input-fields {
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  width: 80%;
}

.input-field-container {
  margin-bottom: 10px;
  width: 100%;
}

.input-field-container > p {
  margin: 5px 0;
}

.bottom-panel {
  background-color: black;
}

.divide {
  border-top: 1px solid white;
  margin: 0px auto 0 auto;
  width: 80%;
}

.button-panel {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.button-panel > button {
  margin: 0 10px;
}

button.btn-cancel {
  background-color: rgb(130, 130, 130);
}

button.btn-add {
  background-color: rgb(60, 195, 35);
}

button.btn-update {
  background-color: rgb(0, 115, 175);
}
</style>

<script>
import {
  TextInputField,
  FileUploadInputField
} from './input';
import { apiClient } from '../../api';

export default {
  name: 'ProjectUpsertWindow',
  data() {
    return {
      tag: '',
      name: '',
      icon: null
    }
  },
  props: {
    technology: {
      type: Object
    }
  },
  components: {
    TextInputField,
    FileUploadInputField
  },
  methods:  {
    actionButtonClass() {
      return [
        { class: 'btn-add', condition: () => !this.technology },
        { class: 'btn-update', condition: () => this.technology }
      ].map(x => x.condition() ? x.class : '').join(' ');
    },
    async mainAction() {
      if(!this.technology) {
        await apiClient.addTechnology(
          this.tag,
          this.name,
          this.icon
        );
      } else {
        console.log('Updating', this.technology.name);
      }
      this.$emit('requestClose');
    },
    cancel() {
      this.$emit('requestClose');
    },
    onTagChanged(value) {
      this.tag = value;
    },
    onNameChanged(value) {
      this.name = value;
    },
    onIconChanged(value) {
      this.icon = value[0];
    }
  },
  computed: {
    title() {
      return !this.technology ? 'Add new technology' : this.technology.name;
    },
    buttonLabel() {
      return !this.technology ? 'Create' : 'Update';
    }
  },
  created() {
    if(this.technology) {
      this.tag = this.technology.tag;
      this.name = this.technology.name;
    }
  }
}
</script>
