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
  color: white;
}

#app {
  background: url('../assets/code.jpeg');
  background-repeat: repeat;
  background-attachment: fixed;
  min-height: 100vh;
}

.relative {
  position: relative;
}

.center-x {
  display: flex;
  justify-content: center;
}

.center-y {
  display: flex;
  align-items: center;
}

.center-xy {
  display: flex;
  justify-content: center;
  align-items: center;
}

input {
  background-color: inherit;
  border: 0;
  color: white;
  font-family: inherit;
  font-size: 1.1em;
  outline: none;
  width: 90%;
}

textarea {
  background-color: inherit;
  border: 0;
  color: white;
  font-family: inherit;
  font-size: 1em;
  outline: none;
  width: 100%;
}

button {
  border: 0;
  border-radius: 1px;
  color: white;
  cursor: pointer;
  font-size: 1.2em;
  outline: none;
  height: 42px;
  padding: 0 10px;
  min-width: 100px;
  transition: background-color 0.25s ease;
}

button.btn-cancel {
  background-color: rgb(75, 75, 75);
}

button.btn-cancel:hover {
  background-color: rgb(95, 95, 95);
}

button.btn-add {
  background-color: rgb(30, 155, 50);
}

button.btn-add:hover {
  background-color: rgb(50, 175, 70);
}

button, button.btn-update {
  background-color: rgb(30, 100, 155);
}

button:hover, button.btn-update:hover {
  background-color: rgb(50, 115, 165);
}

.dropdown {
  background-color: black;
  border: 1px solid white;
  border-top: 0;
  position: absolute;
  top: 45px;
  width: 100%;
  max-height: 200px;
  overflow-y: overlay;
  padding: 5px 0;
  z-index: 1;
}

.shadow {
  box-shadow: 0 0 4px rgb(45, 165, 235);
}

.svg-blue {
  filter: invert(29%) sepia(98%) saturate(615%) hue-rotate(170deg) brightness(91%) contrast(88%);
}

.svg-green {
  filter: invert(49%) sepia(94%) saturate(579%) hue-rotate(62deg) brightness(96%) contrast(107%);
}

.svg-red {
  filter: invert(24%) sepia(75%) saturate(2753%) hue-rotate(344deg) brightness(117%) contrast(106%);
}

.svg-white {
  filter: invert(100%) sepia(3%) saturate(6%) hue-rotate(251deg) brightness(103%) contrast(100%);
}

/* Scroll bar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 3px grey; 
  border-radius: 4px;
}
 
::-webkit-scrollbar-thumb {
  background-color: rgb(90, 90, 90);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgb(60, 60, 60); 
}
</style>
