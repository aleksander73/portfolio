<template>
  <div class="control-panel-container">
      <Navigation @itemSelected="navItemSelected" />
      <div class="main-content-container">

      </div>
  </div>
</template>

<style scoped>
.control-panel-container {
  background-color: rgb(170, 170, 170);
  display: flex;
}

.main-content-container {
  background-color: black;
  margin: 0 auto;
  width: 60%;
}
</style>

<script>
import { Navigation } from '../components';
import { apiClient } from '../api';
import { storage } from '../storage';

export default {
  name: 'ControlPanel',
  data() {
    return {
      sectionId: 'home',
      list: []
    }
  },
  components: {
    Navigation
  },
  methods: {
    async navItemSelected(id) {
      if(id === 'logout') {
        await apiClient.logoutUser();
        this.$router.push('/');
        return;
      } else {
        if(id === 'home') {
          this.list = [];
        } else {
          switch(id) {
            case 'projects': {
              this.list = storage.projects;
              break;
            }
          }
        }
      }      
      this.sectionId = id;
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
