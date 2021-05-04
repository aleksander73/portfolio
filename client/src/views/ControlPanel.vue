<template>
  <div class="control-panel-container">
      <h1>Hello from control panel</h1>
  </div>
</template>

<script>
import { apiClient } from '../api';

export default {
  async created() {
    const user = await apiClient.getLoggedInUser();
    if(!user) {
      this.$router.push('/');
    }
  }
}
</script>
