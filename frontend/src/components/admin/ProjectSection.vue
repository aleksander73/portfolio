<template>
  <div class="project-section-container">
    <h1>{{ 'Projects'.toUpperCase() }}</h1>
    <List :data="projects" :getKey="x => x._id" :getName="x => x.name" :sortFunc="(x, y) => x.name.localeCompare(y.name)" @itemClicked="onListItemClicked" />
    <ProjectUpsertWindow v-if="showUpsertWindow" :project="project" />
  </div>
</template>

<style scoped>
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
    onListItemClicked(item) {
      this.project = item;
      this.showUpsertWindow = true;
    }
  }
}
</script>
