<template>
  <div id="app">
    <Intro :intro="intro"/>
    <div id="projects-start">
      <div  v-for="(project, index) in projects" :key=index>
        <Project :name=project.name :githubRepo=project.githubRepo :technologyTags=project.technologies :description=project.description :images=project.images :ytVideoId=project.ytVideoId />
        <div v-if="index < projects.length - 1" class="horizontal-line"></div>
      </div>
    </div>
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}

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
import Intro from './components/Intro.vue'
import Project from './components/Project.vue';

export default {
  name: 'App',
  data() {
    return {
      intro: '',
      projects: []
    };
  },
  async created() {
    await Storage.initialize();
    this.intro = Storage.getParagraph('INTRO');
    this.projects = Storage.getProjects();
    this.projects.sort((p1, p2) => {
      return p2.score - p1.score;
    });
  },
  components: {
    Intro,
    Project
  }
}
</script>
