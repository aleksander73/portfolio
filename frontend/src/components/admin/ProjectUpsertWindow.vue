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
  position: fixed;
  top: 0;
  left: 70px;
  height: 100vh;
  width: calc(100vw - 70px);
}

.window {
  background-color: black;
  border: 1px solid white;
  border-radius: 5px;
  height: 75%;
  width: 33%;
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
