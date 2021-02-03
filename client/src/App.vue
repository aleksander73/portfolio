<template>
  <div id="app">
    <div v-for="(project, index) in projects" :key=index>
      <Project :name=project.name :technologyTags=project.technologies :description=project.description :images=project.images :ytVideoId=project.ytVideoId />
      <div v-if="index < projects.length - 1" class="horizontal-line"></div>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  background-color: #222629;
  font-family: 'Courier New', Courier, monospace;
}

#app {
  width: 75%;
  color: white;
  margin: 0 auto;
}

.horizontal-line {
  border-top: 5px solid #dadada;
}
</style>

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
