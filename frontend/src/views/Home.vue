<template>
  <div id="home-container">
    <Intro :links="links"/>
    <section id="main-content">
      <Index :projects="projects"/>
      <div id="projects">
        <div v-for="(project, index) in projects" :key=index>
          <Project :name=project.name :technologyTag="project.technologyTag" :githubRepo=project.githubRepo :technologyTags=project.technologies :description=project.description :pictures=project.pictures :ytVideoId=project.ytVideoId />
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
  width: 70%;
  margin: 0 auto;
}

.horizontal-line {
  border-bottom: 15px solid #00000000;
}
</style>

<script>
import { storage} from '../storage'
import {
  Intro,
  Index,
  Project,
  Footer
} from '../components'

export default {
  name: 'Home',
  data() {
    return {
      links: [],
      projects: []
    };
  },
  async created() {
    await storage.initialize();
    this.links = [...storage.links].sort((l1, l2) => l1.priority - l2.priority);
    this.projects = [...storage.projects].sort((p1, p2) => p2.score - p1.score);
  },
  components: {
    Intro,
    Index,
    Project,
    Footer
  }
}
</script>
