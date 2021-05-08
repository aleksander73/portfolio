<template>
  <div class="window-container">
    <div class="window">
      <div class="title-container">
        <h1>{{ title }}</h1>
      </div>
      <div class="input-fields">
        <div class="input-field-container">
          <p>Project name</p>
          <TextInputField placeholder="project name" :initValue="projectName" @input="onNameChanged" />
        </div>
        <div class="input-field-container">
          <p>Project description</p>
          <TextAreaInputField placeholder="project description" :initValue="projectDescription" @input="onDescriptionChanged" />
        </div>
        <div class="input-field-container">
          <p>GitHub repository</p>
          <TextInputField placeholder="github repository" :initValue="githubRepo" @input="onGithubRepoChanged" />
        </div>
      </div>
      <div>
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

.input-fields {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  width: 80%;
}

.input-field-container {
  margin-bottom: 20px;
  width: 100%;
}

.input-field-container > p {
  margin: 5px 0;
}

.divide {
  border-top: 1px solid white;
  margin: 20px auto 0 auto;
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
import { TextInputField, TextAreaInputField } from './input';

export default {
  name: 'ProjectUpsertWindow',
  data() {
    return {
      projectName: '',
      projectDescription: '',
      githubRepo: ''
    }
  },
  props: {
    project: {
      type: Object
    }
  },
  components: {
    TextInputField,
    TextAreaInputField
  },
  methods:  {
    actionButtonClass() {
      return [
        { class: 'btn-add', condition: () => !this.project },
        { class: 'btn-update', condition: () => this.project }
      ].map(x => x.condition() ? x.class : '').join(' ');
    },
    mainAction() {
      if(!this.project) {
        console.log('Adding new project');
      } else {
        console.log('Updating', this.project.name);
      }
    },
    cancel() {
      this.$emit('requestClose');
    },
    onNameChanged(value) {
      this.projectName = value;
    },
    onDescriptionChanged(value) {
      this.projectDescription = value;
    },
    onGithubRepoChanged(value) {
      this.githubRepo = value;
    }
  },
  computed: {
    title() {
      return !this.project ? 'Add new project' : this.project.name;
    },
    buttonLabel() {
      return !this.project ? 'Create' : 'Update';
    }
  },
  created() {
    if(this.project) {
      this.projectName = this.project.name;
      this.projectDescription = this.project.description;
      this.githubRepo = this.project.githubRepo;
    }
  }
}
</script>
