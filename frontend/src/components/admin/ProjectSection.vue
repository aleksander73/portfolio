<template>
  <div class="project-section-container">
    <div class="title-container">
      <h1>{{ 'Projects'.toUpperCase() }}</h1>
      <img src="../../../assets/icons/project.svg" class="svg-white">
    </div>
    <div class="list">
      <List :data="projects" :getKey="x => x._id" :getName="x => x.name" :sortFunc="(x, y) => x.name.localeCompare(y.name)" @itemClicked="openUpsertWindow" />
    </div>
    <transition name="window-fade" mode="out-in">
      <ProjectUpsertWindow v-if="showUpsertWindow" :project="project" @requestClose="closeUpsertWindow" />
    </transition>
  </div>
</template>

<style scoped>
.title-container {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid white;
  padding-bottom: 20px;
}

.title-container > img {
  height: 40px;
  margin-left: 20px;
}

.list {
  margin-top: 50px;
}

.window-fade-enter-active,
.window-fade-leave-active {
  transition: opacity 0.15s linear;
}

.window-fade-enter,
.window-fade-leave-to {
  opacity: 0;
}
</style>

<script>
import { List, ProjectUpsertWindow } from '../../components';
import { storage } from '../../storage';

export default {
  name: 'ProjectSection',
  title: 'Projects',
  data() {
    return {
      projects: [...storage.projects],
      showUpsertWindow: false,
      project: null
    }
  },
  components: {
    List,
    ProjectUpsertWindow
  },
  methods: {
    openUpsertWindow(item) {
      this.project = item;
      this.showUpsertWindow = true;
    },
    closeUpsertWindow() {
      this.project = null;
      this.showUpsertWindow = false;
    }
  }
}
</script>
