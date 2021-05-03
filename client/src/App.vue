<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}

* {
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Courier New', Courier, monospace;
  color: #e2e2e2;
}

#app {
  background: url('../assets/other/code.jpeg');
  background-repeat: repeat;
  background-attachment: fixed;
  min-height: 100vh;
}
</style>
