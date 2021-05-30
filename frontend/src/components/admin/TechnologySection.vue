<template>
  <div class="technology-section-container">
    <div class="title-container">
      <h1>{{ 'Technologies'.toUpperCase() }}</h1>
      <img src="../../../assets/icons/technology.svg" class="svg-white">
    </div>
    <div class="list">
      <List :data="technologies" :getKey="x => x._id" :getName="x => x.name" :sortFunc="(x, y) => x.name.localeCompare(y.name)" @itemClicked="openUpsertWindow" />
    </div>
    <transition name="window-fade" mode="out-in">
      <TechnologyUpsertWindow v-if="showUpsertWindow" :technology="technology" @requestClose="closeUpsertWindow" />
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

.list {
  margin-top: 50px;
}

.window-fade-enter-active,
.window-fade-leave-active {
  transition: opacity 0.15s linear;
}

.window-fade-enter,
.window-fade-leave-to {
  opacity: 0;
}
</style>

<script>
import { List, TechnologyUpsertWindow } from '../../components';
import { storage } from '../../storage';

export default {
  name: 'TechnologySection',
  title: 'Technologies',
  data() {
    return {
      technologies: [...storage.technologies],
      showUpsertWindow: false,
      technology: null
    }
  },
  components: {
    List,
    TechnologyUpsertWindow
  },
  methods: {
    openUpsertWindow(item) {
      this.technology = item;
      this.showUpsertWindow = true;
    },
    closeUpsertWindow() {
      this.technology = null;
      this.showUpsertWindow = false;
    }
  }
}
</script>
