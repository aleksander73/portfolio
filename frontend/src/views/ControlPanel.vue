<template>
  <div class="control-panel-container">
      <Navigation @itemClicked="navItemClicked" />
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
    navItemClicked(params) {}
  },
  async created() {
    const user = await apiClient.getLoggedInUser();
    if(!user) {
      this.$router.push('/');
    }
  }
}
</script>
