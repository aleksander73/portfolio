<template>
  <div class="window-container center-xy">
    <div class="window">
      <div class="title-container">
        <h1>{{ title }}</h1>
      </div>
      <div class="input-fields-container">
        <div class="input-fields">
          <div class="input-field-container">
            <p>Name</p>
            <TextInputField :initValue="name" @input="onNameChanged" />
          </div>
          <div class="input-field-container">
            <p>Icon</p>
            <SingleImageUploadInputField :initIcon="icon.init" @input="onIconChanged" />
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
</style>

<script>
import {
  TextInputField,
  SingleImageUploadInputField
} from './input';
import { apiClient } from '../../api';

export default {
  name: 'TechnologyUpsertWindow',
  data() {
    return {
      name: '',
      icon: {
        init: '',
        deleted: '',
        uploaded: ''
      }
    }
  },
  props: {
    technology: {
      type: Object
    }
  },
  components: {
    TextInputField,
    SingleImageUploadInputField
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
        const technology = await apiClient.addTechnology(this.name, this.icon.uploaded);
        if(technology) {
          this.$emit('requestClose');
        } else {
          console.log('Couldn\'t add project');
        }
      } else {
        const success = await apiClient.editTechnology(this.technology._id, this.name, this.icon.init, this.icon.deleted, this.icon.uploaded);
        if(success) {
          this.$emit('requestClose');
        } else {
          console.log('Couldn\'t edit project');
        }
      }
    },
    cancel() {
      this.$emit('requestClose');
    },
    onNameChanged(value) {
      this.name = value;
    },
    onIconChanged(value) {
      const { deleted, uploaded } = value;
      this.icon.deleted = deleted;
      this.icon.uploaded = uploaded;
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
      this.name = this.technology.name;
      this.icon.init = this.technology.icon;
    }
  }
}
</script>
