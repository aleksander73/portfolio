<template>
  <div class="technology-section-container">
    <h1>{{ 'Technologies'.toUpperCase() }}</h1>
    <List :data="technologies" :getKey="x => x._id" :getName="x => x.name" :sortFunc="(x, y) => x.name.localeCompare(y.name)" @itemClicked="openUpsertWindow" />
    <TechnologyUpsertWindow v-if="showUpsertWindow" :technology="technology" @requestClose="closeUpsertWindow" />
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 40px;
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
