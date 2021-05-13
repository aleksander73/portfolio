<template>
  <div class="link-section-container">
    <h1>{{ 'Links'.toUpperCase() }}</h1>
    <List :data="links" :getKey="x => x._id" :getName="x => x.name" :sortFunc="(x, y) => x.name.localeCompare(y.name)" @itemClicked="openUpsertWindow" />
    <LinkUpsertWindow v-if="showUpsertWindow" :link="link" @requestClose="closeUpsertWindow" />
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 40px;
}
</style>

<script>
import { List, LinkUpsertWindow } from '../../components';
import { storage } from '../../storage';

export default {
  name: 'LinkSection',
  data() {
    return {
      links: [...storage.links],
      showUpsertWindow: false,
      link: null
    }
  },
  components: {
    List,
    LinkUpsertWindow
  },
  methods: {
    openUpsertWindow(item) {
      this.link = item;
      this.showUpsertWindow = true;
    },
    closeUpsertWindow() {
      this.link = null;
      this.showUpsertWindow = false;
    }
  }
}
</script>
