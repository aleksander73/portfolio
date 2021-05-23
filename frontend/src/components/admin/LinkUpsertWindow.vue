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
            <p>Url</p>
            <TextInputField :initValue="url" @input="onUrlChanged" />
          </div>
          <div class="input-field-container">
            <p>Logo</p>
            <SingleImageUploadInputField :initIcon="logo.init" @input="onLogoChanged" />
          </div>
          <div class="input-field-container">
            <p>Priority</p>
            <TextInputField :initValue="priority.toString()" @input="onPriorityChanged" />
          </div>
        </div>
      </div>
      <div class="bottom-panel">
        <div class="divide"></div>
        <div class="button-panel">
          <button class="btn-cancel" @click="cancel()">Cancel</button>
          <LoadingButton :class="actionButtonClass()" :label="buttonLabel" :action="() => mainAction()" @completed="onMainActionCompleted" />
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
import LoadingButton from './LoadingButton';
import { apiClient } from '../../api';

export default {
  name: 'LinkUpsertWindow',
  data() {
    return {
      name: '',
      url: '',
      logo: {
        init: '',
        deleted: '',
        uploaded: ''
      },
      priority: -1
    }
  },
  props: {
    link: {
      type: Object
    }
  },
  components: {
    TextInputField,
    SingleImageUploadInputField,
    LoadingButton
  },
  methods:  {
    actionButtonClass() {
      return [
        { class: 'btn-add', condition: () => !this.link },
        { class: 'btn-update', condition: () => this.link }
      ].map(x => x.condition() ? x.class : '').join(' ');
    },
    async mainAction() {
      if(!this.link) {
        const link =  await apiClient.addLink(this.name, this.url, this.logo.uploaded, this.priority);
        return link;
      } else {
        const success = await apiClient.editLink(this.link._id, this.name, this.url, this.logo.init, this.logo.deleted, this.logo.uploaded, this.priority);
        return success;
      }
    },
    onMainActionCompleted(result) {
      if(result) {
        this.$emit('requestClose');
      } else {
        console.log('Couldn\'t complete the action');
      }
    },
    cancel() {
      this.$emit('requestClose');
    },
    onNameChanged(value) {
      this.name = value;
    },
    onUrlChanged(value) {
      this.url = value;
    },
    onLogoChanged(value) {
      const { deleted, uploaded } = value;
      this.logo.deleted = deleted;
      this.logo.uploaded = uploaded;
    },
    onPriorityChanged(value) {
      this.priority = Number(value);
    }
  },
  computed: {
    title() {
      return !this.link ? 'Add new link' : this.link.name;
    },
    buttonLabel() {
      return !this.link ? 'Create' : 'Update';
    }
  },
  created() {
    if(this.link) {
      this.name = this.link.name;
      this.url = this.link.url;
      this.logo.init = this.link.logo;
      this.priority = this.link.priority;
    }
  }
}
</script>
