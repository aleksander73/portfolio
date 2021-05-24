<template>
  <div class="link-section-container">
    <div class="title-container">
      <h1>{{ 'Links'.toUpperCase() }}</h1>
      <img src="../../../assets/icons/link.svg" class="svg-white">
    </div>
    <div class="list">
      <List :data="links" :getKey="x => x._id" :getName="x => x.name" :sortFunc="(x, y) => x.name.localeCompare(y.name)" @itemClicked="openUpsertWindow" />
    </div>
    <transition name="window-fade" mode="out-in">
      <LinkUpsertWindow v-if="showUpsertWindow" :link="link" @requestClose="closeUpsertWindow" />
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
import { List, LinkUpsertWindow } from '../../components';
import { storage } from '../../storage';

export default {
  name: 'LinkSection',
  title: 'Links',
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
