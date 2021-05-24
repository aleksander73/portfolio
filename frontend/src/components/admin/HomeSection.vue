<template>
  <div class="link-section-container">
    <transition name="title-fade" mode="out-in">
      <div v-if="username" class="title-container">
        <h1>{{ `Welcome, ${username}!`.toUpperCase() }}</h1>
        <img src="../../../assets/icons/home.svg" class="svg-white">
      </div>
    </transition>
  </div>
</template>

<style scoped>
.title-container {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid white;
  padding-bottom: 20px;
}

.title-container > img {
  height: 40px;
  margin-left: 20px;
}

.title-fade-enter-active,
.title-fade-leave-active {
  transition: opacity 1s linear;
}

.title-fade-enter,
.title-fade-leave-to {
  opacity: 0;
}
</style>

<script>
import { apiClient } from '../../api';

export default {
  name: 'HomeSection',
  title: 'Home',
  data() {
    return {
      username: ''
    }
  },
  async created() {
    const user = await apiClient.getLoggedInUser();
    this.username = user.username;
  }
}
</script>
