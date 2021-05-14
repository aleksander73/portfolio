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
            <p>Description</p>
            <TextAreaInputField :initValue="description" @input="onDescriptionChanged" />
          </div>
          <div class="input-field-container">
            <p>Features</p>
            <TextListInputField :initItems="features" @input="onFeaturesChanged" />
          </div>
          <div class="input-field-container">
            <p>GitHub repository</p>
            <TextInputField :initValue="githubRepo" @input="onGithubRepoChanged" />
          </div>
          <div class="input-field-container">
            <p>Technologies</p>
            <MultipleChoiceInputField
              :items="[...allTechnologies]"
              :initSelectedItems="[...technologies]"
              :getKey="x => x.name"
              :getName="x => x.name"
              :sortFunc="(x, y) => x.name.localeCompare(y.name)"
              @input="onTechnologiesChanged"
            />
          </div>
          <div class="input-field-container">
            <p>Technology</p>
            <DropdownListInputField
              :items="[...allTechnologies]"
              :required="false"
              :initSelectedItem="technology"
              :getKey="x => x.name"
              :getName="x => x.name"
              :sortFunc="(x, y) => x.name.localeCompare(y.name)"
              @input="onTechnologyChanged" />
          </div>
          <div class="input-field-container">
            <p>Pictures</p>
            <ImageUploadInputField :initPictures="pictures.all" @input="onPicturesChanged" />
          </div>
          <div class="input-field-container">
            <p>YouTube video ID</p>
            <TextInputField :initValue="ytVideoId" @input="onYtVideoIdChanged" />
          </div>
          <div class="input-field-container">
            <p>Score</p>
            <TextInputField :initValue="score.toString()" @input="onScoreChanged" />
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
  TextAreaInputField,
  TextListInputField,
  DropdownListInputField,
  MultipleChoiceInputField,
  ImageUploadInputField
} from './input';
import { apiClient } from '../../api';
import { storage } from '../../storage';

export default {
  name: 'ProjectUpsertWindow',
  data() {
    return {
      name: '',
      description: '',
      features: [],
      githubRepo: '',
      allTechnologies: [],
      technologies: [],
      technology: null,
      pictures: {
        all: [],
        deleted: [],
        uploaded: []
      },
      ytVideoId: '',
      score: -1
    }
  },
  props: {
    project: {
      type: Object
    }
  },
  components: {
    TextInputField,
    TextAreaInputField,
    TextListInputField,
    DropdownListInputField,
    MultipleChoiceInputField,
    ImageUploadInputField
  },
  methods:  {
    actionButtonClass() {
      return [
        { class: 'btn-add', condition: () => !this.project },
        { class: 'btn-update', condition: () => this.project }
      ].map(x => x.condition() ? x.class : '').join(' ');
    },
    async mainAction() {
      let success = false;
      if(!this.project) {
        success = await apiClient.addProject(
          this.name,
          this.description,
          this.features,
          this.githubRepo,
          this.technologies.map(x => x.tag),
          this.technology ? this.technology.tag : '',
          this.pictures.uploaded,
          this.ytVideoId,
          this.score
        );
      } else {
        success = await apiClient.editProject(
          this.project._id,
          this.name,
          this.description,
          this.features,
          this.githubRepo,
          this.technologies.map(x => x.tag),
          this.technology ? this.technology.tag : '',
          this.pictures.all,
          this.pictures.deleted,
          this.pictures.uploaded,
          this.ytVideoId,
          this.score
        );
      }
      if(success) {
        this.$emit('requestClose');
      } else {
        console.log('Couldn\'t add / upload...');
      }
    },
    cancel() {
      this.$emit('requestClose');
    },
    onNameChanged(value) {
      this.name = value;
    },
    onDescriptionChanged(value) {
      this.description = value;
    },
    onFeaturesChanged(value) {
      this.features = value;
    },
    onGithubRepoChanged(value) {
      this.githubRepo = value;
    },
    onTechnologiesChanged(value) {
      this.technologies = value;
    },
    onTechnologyChanged(value) {
      this.technology = value;
    },
    onPicturesChanged(value) {
      const { deleted, uploaded } = value;
      this.pictures.deleted = deleted;
      this.pictures.uploaded = uploaded;
    },
    onYtVideoIdChanged(value) {
      this.ytVideoId = value;
    },
    onScoreChanged(value) {
      this.score = Number(value);
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
    this.allTechnologies = storage.technologies;
    if(this.project) {
      this._id = this.project._id;
      this.name = this.project.name;
      this.description = this.project.description;
      this.features = this.project.features;
      this.githubRepo = this.project.githubRepo;
      this.technologies = this.project.technologies.map(tag => this.allTechnologies.find(x => x.tag === tag));
      this.technology = this.allTechnologies.find(x => x.tag === this.project.technologyTag);
      this.pictures.all = this.project.pictures;
      this.ytVideoId = this.project.ytVideoId;
      this.score = this.project.score;
    }
  }
}
</script>
