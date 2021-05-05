<template>
  <div class="control-panel-container">
      <Navigation @itemSelected="navItemSelected" />
  </div>
</template>

<style scoped>
.control-panel-container {
  background-color: rgb(170, 170, 170);
}
</style>


<script>
import { Navigation } from '../components';
import { apiClient } from '../api';

export default {
  name: 'ControlPanel',
  components: {
    Navigation
  },
  methods: {
    async navItemSelected(params) {
      const id = params.navItemId;
      switch(id) {
        case 'home': {
          break;
        }
        case 'projects': {
          break;
        }
        case 'logout': {
          await apiClient.logoutUser();
          this.$router.push('/');
          break;
        }
      }
    }
  },
  async created() {
    const user = await apiClient.getLoggedInUser();
    if(!user) {
      this.$router.push('/');
    }
  }
}
</script>
