<template>
  <div id="app">
    <div v-for="(project, index) in projects" :key=index>
      <Project :name=project.name :description=project.description :images=project.images />
      <hr v-if="index !== projects.length - 1">
    </div>
  </div>
</template>

<style></style>

<script>
import ApiService from './ApiService'
import Project from './components/Project.vue';

export default {
  name: 'App',
  data() {
    return {
      projects: []
    };
  },
  async created() {
    this.projects = await ApiService.getProjects();
  },
  components: {
    Project
  }
}
</script>
