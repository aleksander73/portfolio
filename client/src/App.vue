<template>
  <div id="app">
    <div v-for="(project, index) in projects" :key=index>
      <Project :name=project.name :description=project.description :images=project.images :ytVideoId=project.ytVideoId />
      <hr v-if="index !== projects.length - 1">
    </div>
  </div>
</template>

<style></style>

<script>
import Storage from './Storage'
import Project from './components/Project.vue';

export default {
  name: 'App',
  data() {
    return {
      projects: []
    };
  },
  async created() {
    await Storage.initialize();
    this.projects = Storage.getProjects();
  },
  components: {
    Project
  }
}
</script>
