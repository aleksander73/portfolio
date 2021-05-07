<template>
  <div class="window-container">
    <div class="window">{{ project }}</div>
  </div>
</template>

<style scoped>
.window-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}

.window {
  background-color: rgb(175, 175, 175);
  height: 50%;
  width: 50%;
}
</style>

<script>
export default {
  name: 'ProjectUpsertWindow',
  props: {
    project: {
      type: Object
    }
  }
}
</script>
