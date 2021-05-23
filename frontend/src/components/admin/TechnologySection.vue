<template>
  <div class="technology-section-container">
    <div class="title-container">
      <h1>{{ 'Technologies'.toUpperCase() }}</h1>
      <img src="../../../assets/icons/technology.svg" class="svg-white">
    </div>
    <div class="list">
      <List :data="technologies" :getKey="x => x._id" :getName="x => x.name" :sortFunc="(x, y) => x.name.localeCompare(y.name)" @itemClicked="openUpsertWindow" />
    </div>
    <TechnologyUpsertWindow v-if="showUpsertWindow" :technology="technology" @requestClose="closeUpsertWindow" />
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
</style>

<script>
import { List, TechnologyUpsertWindow } from '../../components';
import { storage } from '../../storage';

export default {
  name: 'TechnologySection',
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
