<template>
  <div id="home-container">
    <Intro :links="links"/>
    <section id="main-content">
      <Index :projects="projects"/>
      <div id="projects">
        <div v-for="(project, index) in projects" :key=index>
          <ProjectTile :project="project" />
          <div v-if="index < projects.length - 1" class="horizontal-line"></div>
        </div>
      </div>
    </section>
    <Footer/>
  </div>
</template>

<style>
#main-content {
  display: flex;
  justify-content: space-around;
}

#projects {
  width: 60%;
  margin: 0 auto;
}

.horizontal-line {
  border-bottom: 10px solid #00000000;
}
</style>

<script>
import { dataAssembler } from '../assembler';
import {
  Intro,
  Index,
  ProjectTile,
  Footer
} from '../components'
import { apiClient } from '../api';

export default {
  name: 'Home',
  title: 'Home',
  data() {
    return {
      projects: [],
      links: []
    };
  },
  async created() {
    this.links = (await apiClient.getLinks()).sort((x, y) => x.priority - y.priority);
    const technologies = await apiClient.getTechnologies();
    this.projects = (await apiClient.getProjects()).map(project => dataAssembler.assebleProject(project, technologies)).sort((x, y) => -(x.score - y.score));
  },
  components: {
    Intro,
    Index,
    ProjectTile,
    Footer
  }
}
</script>
