<template>
  <div class="project-section-container">
    <h1>{{ 'Projects'.toUpperCase() }}</h1>
    <List :data="projects" :getKey="x => x._id" :getName="x => x.name" :sortFunc="(x, y) => x.name.localeCompare(y.name)" @itemClicked="openUpsertWindow" />
    <ProjectUpsertWindow v-if="showUpsertWindow" :project="project" @requestClose="closeUpsertWindow" />
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 40px;
}
</style>

<script>
import { List, ProjectUpsertWindow } from '../../components';
import { storage } from '../../storage';

export default {
  name: 'ProjectSection',
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
