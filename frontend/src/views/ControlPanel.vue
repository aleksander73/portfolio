<template>
  <div class="control-panel-container">
      <Navigation @itemSelected="navItemSelected" />
      <div class="main-content-container">
        <ProjectSection v-if="sectionId === 'projects'" />
        <TechnologySection v-if="sectionId === 'technologies'" />
        <LinkSection v-if="sectionId === 'links'" />
      </div>
  </div>
</template>

<style scoped>
.control-panel-container {
  background-color: rgb(170, 170, 170);
  color: white;
  display: flex;
  position: relative;
}

.main-content-container {
  background-color: black;
  margin: 0 auto;
  padding: 60px;
  width: 60%;
}
</style>

<script>
import { Navigation, ProjectSection, TechnologySection, LinkSection } from '../components';
import { apiClient } from '../api';
import { storage } from '../storage';

export default {
  name: 'ControlPanel',
  title: 'Control panel',
  data() {
    return {
      sectionId: 'home'
    }
  },
  components: {
    Navigation,
    ProjectSection,
    TechnologySection,
    LinkSection
  },
  methods: {
    async navItemSelected(id) {
      if(id !== 'logout') {
        this.sectionId = id;
      } else {
        await apiClient.logoutUser();
        this.$router.push('/');
      }      
    }
  },
  async created() {
    const user = await apiClient.getLoggedInUser();
    if(!user) {
      this.$router.push('/');
    } else {
      storage.initialize();
    }
  }
}
</script>
