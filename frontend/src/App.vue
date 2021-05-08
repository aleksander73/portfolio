<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');

html {
  scroll-behavior: smooth;
}

* {
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Open Sans', sans-serif;
  color: #e2e2e2;
}

#app {
  background: url('../assets/other/code.jpeg');
  background-repeat: repeat;
  background-attachment: fixed;
  min-height: 100vh;
}

button {
  background-color: rgb(22, 142, 255);
  border: 0;
  border-radius: 3px;
  color: white;
  cursor: pointer;
  font-size: 1.2em;
  outline: none;
  padding: 10px;
  min-width: 100px;
  transition: background-color 0.25s ease;
}

button:hover {
  background-color: rgb(0, 120, 233);
}
</style>
