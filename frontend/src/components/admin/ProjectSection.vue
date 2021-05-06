<template>
  <div class="project-section-container">
    <h1>{{ 'Projects'.toUpperCase() }}</h1>
    <List :data="projects" :getKey="x => x._id" :getName="x => x.name" :sortFunc="(x, y) => x.name.localeCompare(y.name)" />
  </div>
</template>

<style scoped>
</style>

<script>
import { List } from '../../components';
import { storage } from '../../storage';

export default {
  name: 'ProjectSection',
  data() {
    return {
      projects: [...storage.projects]
    }
  },
  components: {
    List
  }
}
</script>
