<template>
  <div class="link-section-container">
    <div class="title-container">
      <h1>{{ 'Home'.toUpperCase() }}</h1>
      <img src="../../../assets/icons/home.svg" class="svg-white">
    </div>
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
</style>

<script>
export default {
  name: 'HomeSection'
}
</script>
