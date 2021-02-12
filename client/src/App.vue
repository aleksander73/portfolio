<template>
  <div id="app">
    <Intro/>
    <section id="main-content">
      <Index :projects="projects"/>
      <div id="projects">
        <div v-for="(project, index) in projects" :key=index>
          <Project :name=project.name :technologyTag="project.technologyTag" :githubRepo=project.githubRepo :technologyTags=project.technologies :description=project.description :images=project.images :ytVideoId=project.ytVideoId />
          <div v-if="index < projects.length - 1" class="horizontal-line"></div>
        </div>
      </div>
    </section>
    <Footer/>
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
  font-family: 'Courier New', Courier, monospace;
  color: #e2e2e2;
}

#app {
  background: url('../assets/other/code.jpeg');
  background-repeat: repeat;
  background-attachment: fixed;
}

#main-content {
  display: flex;
  justify-content: space-around;
}

#projects {
  width: 70%;
  margin: 0 auto;
}

.horizontal-line {
  border-bottom: 15px solid #00000000;
}
</style>

<script>
import Storage from './Storage'
import Intro from './components/Intro.vue'
import Index from './components/Index.vue';
import Project from './components/Project.vue';
import Footer from './components/Footer.vue';

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
    this.projects.sort((p1, p2) => {
      return p2.score - p1.score;
    });
  },
  components: {
    Intro,
    Index,
    Project,
    Footer
  }
}
</script>
